import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Store } from '@ngrx/store';
import * as productActions from './state/product.actions'

// (5)
import * as fromRoot from './state/index'

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: IProduct[];
  filteredProducts: IProduct[];

  get filterBy(): string {
    return this.productParameterService.filterBy;
  }
  set filterBy(value: string) {
    this.productParameterService.filterBy = value;
  }

  // Used to highlight the selected product in the list
  get selectedProduct(): IProduct | null {
    return this.productService.currentProduct;
  }

  // (5) Strongly type the generic parameter for the store.
  constructor(private router: Router,
    private store: Store<fromRoot.State>,
    private productService: ProductService,
    private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(null);
      },
      (err: ErrorObservable) => this.errorMessage = err.error
    );

    // (6) Use our strongly typed state
    // Get only what you need
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

  onValueChange(value: string): void {
    // Retain the selection
    this.filterBy = value;
    this.performFilter(value);
  }

  performFilter(filterBy: string | null): void {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      this.filteredProducts = this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }

}
