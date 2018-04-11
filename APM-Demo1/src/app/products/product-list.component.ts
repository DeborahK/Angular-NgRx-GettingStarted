import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

/* NgRx */
import { Store } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: IProduct[];

  // Used to highlight the selected product in the list
  selectedProduct: IProduct | null;
  sub: Subscription;

  constructor(private store: Store<any>,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => this.products = products,
      err => this.errorMessage = err.error
    );

    this.store.select('product').subscribe(
      products => {
        if (products) {
          this.displayCode = products.showProductCode;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  newProduct(): void {
    this.productService.newProduct();
  }

  productSelected(product: IProduct): void {
    this.productService.changeSelectedProduct(product);
  }

}
