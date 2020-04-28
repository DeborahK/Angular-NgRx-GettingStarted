import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts()
          .pipe(
            map(products => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsFailure({ error })))
          )
      )
    ));

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap(({ product }) =>
        this.productService.updateProduct(product)
          .pipe(
            map(product => (ProductActions.updateProductSuccess({ product }))),
            catchError(error => of(ProductActions.updateProductFailure({ error })))
          )
      )
    ));

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      concatMap(({ product }) =>
        this.productService.createProduct(product)
          .pipe(
            map(product => (ProductActions.createProductSuccess({ product }))),
            catchError(error => of(ProductActions.createProductFailure({ error })))
          )
      )
    ));

  deleteProduct$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(ProductActions.deleteProduct),
        mergeMap(({ productId }) =>
          this.productService.deleteProduct(productId).pipe(
            map(() => (ProductActions.deleteProductSuccess({ productId }))),
            catchError(error => of(ProductActions.deleteProductFailure({ error })))
          )
        )
      ));

  constructor(private productService: ProductService,
              private actions$: Actions<ProductActions.ProductActionsUnion>) { }
}
