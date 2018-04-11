import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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
  get selectedProduct(): IProduct | null {
    return this.productService.currentProduct;
  }

  // (5) Strongly type the generic parameter for the store.
  constructor(private router: Router,
    private store: Store<fromProduct.State>,
    private productService: ProductService,
    private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    // (5) Select the slice of state ... displays the initial state
    this.products$ = this.store.select(state => state.product.products);

    // (5) Dispatch the load
    this.store.dispatch(new productActions.LoadProductsAction());

    // Get only what you need
    // Subscribe here because it does not use an async pipe
    this.store.select(state => state.product.showProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  onAdd(): void {
    // Navigate to the edit
    this.router.navigate(['/products', 0, 'edit']);
  }

  onChange(value: boolean): void {
    // (4) Dispatch action
    this.store.dispatch(new productActions.ToggleProductCodeAction(value));
  }

  onSelected(product: IProduct): void {
    // Navigate to the detail
    this.router.navigate(['/products', product.id, 'detail']);
  }

}
