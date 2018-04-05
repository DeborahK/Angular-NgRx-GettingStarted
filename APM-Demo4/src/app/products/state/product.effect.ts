import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as fromProduct from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProductEffects {

  constructor(private productService: ProductService, private actions$: Actions) {}

  // (2) Listen for the load actions
  @Effect()
  loadingProducts$: Observable<Action> = this.actions$.pipe(
    ofType(fromProduct.ProductStateActionTypes.LoadProducts),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (new fromProduct.LoadProductsActionSuccess(products))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.LoadProductsFailAction(err.message)))
      )
    )
  );

}
