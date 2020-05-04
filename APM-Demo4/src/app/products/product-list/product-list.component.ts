import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../product';

/* NgRx */
import { Store } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;

  products$: Observable<Product[]>;
  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.products$ = this.store.select(fromProduct.getProducts) as Observable<Product[]>;

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(fromProduct.getError);

    this.store.dispatch(productActions.loadProducts());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedProduct$ = this.store.select(fromProduct.getCurrentProduct);

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(fromProduct.getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(productActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(productActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(productActions.setCurrentProduct({ product }));
  }

}
