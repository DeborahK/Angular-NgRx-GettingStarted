import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../shared/models/product';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getVendorProducts, getError } from '../../../shared/state/vendors/vendor.reducer';
import { VendorPageActions } from '../../actions';

@Component({
  selector: 'pm-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css']
})
export class VendorProductsComponent implements OnInit {
  pageTitle = 'Products for Vendor';
  errorMessage$: Observable<string>;

  products$: Observable<Product[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    this.products$ = this.store.select(getVendorProducts);

    // NOTE: If this dispatches an action to load products
    // and that action is processed by a *product* effect,
    // it won't perform the action if the product effects have not
    // yet been loaded.
    // this.store.dispatch(VendorPageActions.loadProducts());

    this.errorMessage$ = this.store.select(getError);
  }

}
