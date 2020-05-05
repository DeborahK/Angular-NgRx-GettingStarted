import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProduct from '../../../state/product';
import { Product } from '../../../state/product/product';
import { productPageActions } from '../../../state/product/actions';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.dispatch(productPageActions.loadProducts());
    this.products$ = this.store.select(fromProduct.getProducts);
    this.errorMessage$ = this.store.select(fromProduct.getError);
    this.selectedProduct$ = this.store.select(fromProduct.getCurrentProduct);
    this.displayCode$ = this.store.select(fromProduct.getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(productPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(productPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(productPageActions.setCurrentProduct({ product }));
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(productPageActions.deleteProduct({ productId: product.id }));
  }

  clearProduct(): void {
    this.store.dispatch(productPageActions.clearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(productPageActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(productPageActions.updateProduct({ product }));
  }
}
