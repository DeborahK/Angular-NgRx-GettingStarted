import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromProduct from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(private productService: ProductService,
              private actions$: Actions) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(fromProduct.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (new fromProduct.LoadSuccess(products))),
        catchError(err => of(new fromProduct.LoadFail(err)))
      )
    )
  );

}
