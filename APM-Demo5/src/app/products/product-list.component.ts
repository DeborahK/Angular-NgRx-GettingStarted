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

  products$: Store<IProduct[]>;

  // Used to highlight the selected product in the list
  selectedProduct: IProduct | null;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    // TODO: DUNCAN: This now uses all of the state ... do we do it differently?

    // Do NOT subscribe here because it DOES use an async pipe
    this.products$ = this.store.select(state => state.productFeature.product.products);

    this.store.dispatch(new productActions.LoadProductsAction());

    // Subscribe here because it does not use an async pipe
    this.store.select(state => state.productFeature.product.currentProduct).subscribe(product => {
      this.selectedProduct = product;
    });

    // Subscribe here because it does not use an async pipe
    this.store.select(state => state.productFeature.product.showProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCodeAction(value));
  }

  newProduct(): void {
    this.productSelected(this.productService.newProduct());
  }

  productSelected(product: IProduct): void {
    this.store.dispatch(new productActions.SetCurrentProductAction(product));
  }

}
