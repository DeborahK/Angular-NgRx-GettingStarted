import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { VendorService } from './vendor.service';
import { ProductService } from 'src/app/products/product.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VendorApiActions, VendorPageActions } from './actions';

@Injectable()
export class VendorEffects {

  constructor(private actions$: Actions, private vendorService: VendorService, private productService: ProductService) { }

  loadVendors$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(VendorPageActions.loadVendors),
        mergeMap(() => this.vendorService.getVendors()
          .pipe(
            map(vendors => VendorApiActions.loadVendorsSuccess({ vendors })),
            catchError(error => of(VendorApiActions.loadVendorsFailure({ error })))
          )
        )
      );
  });

}
