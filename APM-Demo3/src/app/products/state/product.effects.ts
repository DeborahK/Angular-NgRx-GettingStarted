import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) { }

  loadProducts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productService.getProducts()
          .pipe(
            map(products => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsFailure({ error })))
          )
        )
      );
  });
}
