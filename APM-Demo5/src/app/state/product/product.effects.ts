import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from './product.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { productPageActions, productApiActions } from './actions';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) { }

  loadProducts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(productPageActions.loadProducts),
        mergeMap(() =>
          this.productService.getProducts()
            .pipe(
              map(products => productApiActions.loadProductsSuccess({ products })),
              catchError(error => of(productApiActions.loadProductsFailure({ error })))
            )
        )
      );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(productPageActions.updateProduct),
        concatMap(action =>
          this.productService.updateProduct(action.product)
            .pipe(
              map(product => (productApiActions.updateProductSuccess({ product }))),
              catchError(error => of(productApiActions.updateProductFailure({ error })))
            )
        )
      );
  });

  createProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(productPageActions.createProduct),
        concatMap(action =>
          this.productService.createProduct(action.product)
            .pipe(
              map(product => (productApiActions.createProductSuccess({ product }))),
              catchError(error => of(productApiActions.createProductFailure({ error })))
            )
        )
      );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(productPageActions.deleteProduct),
        mergeMap(action =>
          this.productService.deleteProduct(action.productId).pipe(
            map(() => (productApiActions.deleteProductSuccess({ productId: action.productId }))),
            catchError(error => of(productApiActions.deleteProductFailure({ error })))
          )
        )
      );
  });
}
