import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { Product } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromProduct from './product.actions';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class ProductEffects {

  constructor(private productService: ProductService,
              private actions$: Actions) {}

  @Effect()
  loadingProducts$: Observable<Action> = this.actions$.pipe(
    ofType(fromProduct.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (new fromProduct.LoadSuccess(products))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.LoadFail(err.message)))
      )
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType<fromProduct.UpdateProduct>(fromProduct.ProductActionTypes.UpdateProduct),
    map(action => action.payload),
    mergeMap(product =>
      this.productService.saveProduct(product).pipe(
        map(updatedProduct => (new fromProduct.UpdateProductSuccess(updatedProduct))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.UpdateProductFail(err.message)))
      )
    )
  );
}
