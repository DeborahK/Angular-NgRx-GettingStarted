import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { Product } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromProduct from './product.actions';
import { ProductActionTypes } from './product.actions';

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
    ofType(ProductActionTypes.UpdateProduct),
    map((action: fromProduct.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map(updatedProduct => (new fromProduct.UpdateProductSuccess(updatedProduct))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.UpdateProductFail(err.message)))
      )
    )
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.CreateProduct),
    map((action: fromProduct.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
        map(updatedProduct => (new fromProduct.CreateProductSuccess(updatedProduct))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.CreateProductFail(err.message)))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.DeleteProduct),
    map((action: fromProduct.DeleteProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.deleteProduct(product.id).pipe(
        map(() => (new fromProduct.DeleteProductSuccess(product))),
        // NOTE: This sets up the error handling ... but does not actually do anything with it.
        // Left to the viewer.
        catchError(err => of(new fromProduct.DeleteProductFail(err.message)))
      )
    )
  );
}
