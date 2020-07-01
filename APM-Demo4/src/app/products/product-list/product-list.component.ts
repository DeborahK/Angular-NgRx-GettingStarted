import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  products$: Observable<Product[]>;
  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.products$ = this.store.select(getProducts);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
