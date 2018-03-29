import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  // (1) Add code to monitor action in the component
  private _displayCode: boolean;
  get displayCode(): boolean {
    return this._displayCode;
  }
  set displayCode(value: boolean) {
    // (3) Dispatch action
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

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

  // (2) Inject the store
  constructor(private router: Router,
              private store: Store<any>,
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

    // (6) Always get the entire state tree
    this.store.select('products').subscribe(
      products => {
        if (products) {
          this._displayCode = products.showProductCode;
        }
      }
    );
  }

  onAdd(): void {
    // Navigate to the edit
    this.router.navigate(['/products', 0, 'edit']);
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
