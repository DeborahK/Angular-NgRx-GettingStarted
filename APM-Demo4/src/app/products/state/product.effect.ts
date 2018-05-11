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
              private actions$: Actions) { }

  @Effect()
  loadingProducts$: Observable<Action> = this.actions$.pipe(
    ofType(fromProduct.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (new fromProduct.LoadSuccess(products))),
        catchError(err => of(new fromProduct.LoadFail(err)))
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
        catchError(err => of(new fromProduct.UpdateProductFail(err)))
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
        catchError(err => of(new fromProduct.CreateProductFail(err)))
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
        catchError(err => of(new fromProduct.DeleteProductFail(err)))
      )
    )
  );
}
