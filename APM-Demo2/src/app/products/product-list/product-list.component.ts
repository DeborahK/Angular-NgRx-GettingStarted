import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowProductCode, getCurrentProduct } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // TODO: Unsubscribe
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

}
