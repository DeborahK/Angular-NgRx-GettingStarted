import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { IProduct } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromProduct from './product.actions';
import { ProductStateActionTypes } from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(private productService: ProductService, private actions$: Actions) {}

  @Effect()
  loadingProducts$: Observable<Action> = this.actions$.pipe(
    ofType(ProductStateActionTypes.LoadProducts),
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
    ofType(ProductStateActionTypes.UpdateProduct),
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

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(ProductStateActionTypes.CreateProduct),
    map((action: fromProduct.CreateProductAction) => action.payload),
    mergeMap((product: IProduct) =>
      this.productService.saveProduct(product).pipe(
        map(updatedProduct => (new fromProduct.CreateProductSuccessAction(updatedProduct))),
        catchError(err => of(new fromProduct.CreateProductFailAction(err.message)))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(ProductStateActionTypes.DeleteProduct),
    map((action: fromProduct.DeleteProductAction) => action.payload),
    mergeMap((product: IProduct) =>
      this.productService.saveProduct(product).pipe(
        map(updatedProduct => (new fromProduct.DeleteProductSuccessAction(updatedProduct))),
        catchError(err => of(new fromProduct.DeleteProductFailAction(err.message)))
      )
    )
  );
}
