import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProduct from '../../../state/product';
import { Product } from '../../../state/product/product';
import { ProductPageActions } from '../../../state/product/actions';

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
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(fromProduct.getProducts);
    this.errorMessage$ = this.store.select(fromProduct.getError);
    this.selectedProduct$ = this.store.select(fromProduct.getCurrentProduct);
    this.displayCode$ = this.store.select(fromProduct.getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ product }));
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.deleteProduct({ productId: product.id }));
  }

  clearProduct(): void {
    this.store.dispatch(ProductPageActions.clearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
  }
}
