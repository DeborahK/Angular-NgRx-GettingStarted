import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

/* NgRx */
import { Store } from '@ngrx/store';
import * as fromProduct from './state/product.reducer';
import * as productActions from './state/product.actions';

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
  selectedProduct: IProduct | null;

  // (5) Strongly type the generic parameter for the store.
  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    // Homework
    this.store.select(state => state.product.currentProduct).subscribe(product => {
      this.selectedProduct = product;
    });

    this.store.select(state => state.product.showProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCodeAction(value));
  }

  // Homework +
  newProduct(): void {
    this.productSelected(this.productService.newProduct());
  }

  productSelected(product: IProduct): void {
    // Homework
    this.store.dispatch(new productActions.SetCurrentProductAction(product));
  }

}
