import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as fromProduct from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { of } from 'rxjs/observable/of';
import { IProduct } from '../product';

@Injectable()
export class ProductEffects {

  constructor(private productService: ProductService, private actions$: Actions) {}

  @Effect()
  loadingProducts$: Observable<Action> = this.actions$.pipe(
    ofType(fromProduct.ProductStateActionTypes.LoadProducts),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (new fromProduct.LoadProductsSuccessAction(products))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.LoadProductsFailAction(err.message)))
      )
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(fromProduct.ProductStateActionTypes.UpdateProduct),
    map((action: fromProduct.UpdateProductAction) => action.payload),
    mergeMap((product: IProduct) =>
      this.productService.saveProduct(product).pipe(
        map(updatedProduct => (new fromProduct.UpdateProductSuccessAction(updatedProduct))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.UpdateProductFailAction(err.message)))
      )
    )
  );
}
