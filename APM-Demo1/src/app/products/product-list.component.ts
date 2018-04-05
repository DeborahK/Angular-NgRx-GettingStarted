import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

/* ngrx */
import { Store } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: IProduct[];

  // Used to highlight the selected product in the list
  get selectedProduct(): IProduct | null {
    return this.productService.currentProduct;
  }

  constructor(private router: Router,
              private store: Store<any>,
              private productService: ProductService,
              private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => this.products = products,
      (err: ErrorObservable) => this.errorMessage = err.error
    );

    this.store.select('product').subscribe(
      products => {
        if (products) {
          this.displayCode = products.showProductCode;
        }
      }
    );
  }

  onAdd(): void {
    // Navigate to the edit
    this.router.navigate(['/products', 0, 'edit']);
  }

  onChange(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  onSelected(product: IProduct): void {
    // Navigate to the detail
    this.router.navigate(['/products', product.id, 'detail']);
  }

}
