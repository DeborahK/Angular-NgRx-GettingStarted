import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from './state/product.reducer';
import * as productActions from './state/product.actions';
import * as fromUser from '../user/state/user.reducer'
import { User } from '../user/user';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];
  
  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  // Strongly type the generic parameter for the store.
  constructor(private store: Store<fromProduct.ProductState>,
              private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    // Homework
    this.store.pipe(select(fromProduct.getCurentProduct)).subscribe(
      product => this.selectedProduct = product
    );

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
    // TODO: Should we unsubscribe?
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  // Homework +
  newProduct(): void {
    this.productSelected(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    // Homework
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
