import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from './state/product.reducer';
import * as productActions from './state/product.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    // This now uses all of the state ... do we do it differently?
    // No, keep them separate because only want notifications when appropriate.

    // Do NOT subscribe here because it DOES use an async pipe
    // this.products$ = this.store.select(state => state.productFeature.products);
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;

    this.store.dispatch(new productActions.Load());

    // Subscribe here because it does not use an async pipe
    // this.store.select(state => state.productFeature.currentProduct).subscribe(product => {
    //   this.selectedProduct = product;
    // });
    this.store.pipe(select(fromProduct.getCurentProduct)).subscribe(product => {
      this.selectedProduct = product;
    });

    // Subscribe here because it does not use an async pipe
    // this.store.select(state => state.productFeature.showProductCode).subscribe(
    //   showProductCode => this.displayCode = showProductCode
    // );
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.productSelected(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
