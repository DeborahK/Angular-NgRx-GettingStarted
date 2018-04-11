import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from './product';

/* NgRx */
import { Store } from '@ngrx/store';
import * as productActions from './state/product.actions';
import * as fromProduct from './state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  displayCode: boolean;

  // (5) Define the observable property
  // (6) Change to a async pipe
  products$: Store<IProduct[]>;

  // Used to highlight the selected product in the list
  selectedProduct: IProduct | null;

  // (5) Strongly type the generic parameter for the store.
  constructor(private router: Router,
    private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    // TODO: DUNCAN: This now uses all of the state ... do we do it differently?

    // (5) Select the slice of state ... displays the initial state
    this.products$ = this.store.select(state => state.product.products);

    this.store.select(state => state.product.currentProduct).subscribe(product => {
      this.selectedProduct = product;
    });

    // (5) Dispatch the load
    this.store.dispatch(new productActions.LoadProductsAction());

    // Get only what you need
    // Subscribe here because it does not use an async pipe
    this.store.select(state => state.product.showProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  onAdd(): void {
    // TODO: Dispatch an action to create an empty product
  }

  onChange(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCodeAction(value));
  }

  onSelected(product: IProduct): void {
    // Dispatch an action to set the current product
    this.store.dispatch(new productActions.SetCurrentProductAction(product));
  }

}
