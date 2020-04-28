import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

  loadProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts.type),
      mergeMap(() =>
        this.productService.getProducts()
          .pipe(
            map(products => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsFailure({ error })))
          )
      )
    ));

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct.type),
      mergeMap(({ product }) =>
        this.productService.updateProduct(product)
          .pipe(
            map(updatedProduct => (ProductActions.updateProductSuccess({ product: updatedProduct }))),
            catchError(error => of(ProductActions.updateProductFailure({ error })))
          )
      )
    ));

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct.type),
      mergeMap(({ product }) =>
        this.productService.createProduct(product)
          .pipe(
            map(newProduct => (ProductActions.createProductSuccess({ product: newProduct }))),
            catchError(error => of(ProductActions.createProductFailure({ error })))
          )
      )
    ));

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$
      .pipe(
        ofType(ProductActions.deleteProduct.type),
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
