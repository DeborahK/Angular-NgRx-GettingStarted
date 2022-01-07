import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

import { ProductPageActions, ProductApiActions } from './actions';
import { Actions } from 'mini-rx-store';
import {ofType} from 'ts-action-operators'

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) {}

    loadProducts$ = this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() =>
                this.productService.getProducts().pipe(
                    map((products) => ProductApiActions.loadProductsSuccess({ products })),
                    catchError((error) => of(ProductApiActions.loadProductsFailure({ error })))
                )
            )
        );

    updateProduct$ = this.actions$.pipe(
            ofType(ProductPageActions.updateProduct),
            concatMap((action) =>
                this.productService.updateProduct(action.product).pipe(
                    map((product) => ProductApiActions.updateProductSuccess({ product })),
                    catchError((error) => of(ProductApiActions.updateProductFailure({ error })))
                )
            )
        );

    createProduct$ = this.actions$.pipe(
            ofType(ProductPageActions.createProduct),
            concatMap((action) =>
                this.productService.createProduct(action.product).pipe(
                    map((product) => ProductApiActions.createProductSuccess({ product })),
                    catchError((error) => of(ProductApiActions.createProductFailure({ error })))
                )
            )
        );

    deleteProduct$ = this.actions$.pipe(
            ofType(ProductPageActions.deleteProduct),
            mergeMap((action) =>
                this.productService.deleteProduct(action.productId).pipe(
                    map(() =>
                        ProductApiActions.deleteProductSuccess({
                            productId: action.productId,
                        })
                    ),
                    catchError((error) => of(ProductApiActions.deleteProductFailure({ error })))
                )
            )
        );
}
