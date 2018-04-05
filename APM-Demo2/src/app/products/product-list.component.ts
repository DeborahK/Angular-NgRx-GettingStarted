import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

/* ngrx */
import { Store } from '@ngrx/store';
import * as productActions from './state/product.actions';
import * as fromProduct from './state/product.reducer';

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

  // (5) Strongly type the generic parameter for the store.
  constructor(private router: Router,
    private store: Store<fromProduct.State>,
    private productService: ProductService,
    private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => this.products = products,
      (err: ErrorObservable) => this.errorMessage = err.error
    );

    this.store.select(state => state.product.showProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  onAdd(): void {
    // Navigate to the edit
    this.router.navigate(['/products', 0, 'edit']);
  }

  onChange(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCodeAction(value));
  }

  onSelected(product: IProduct): void {
    // Navigate to the detail
    this.router.navigate(['/products', product.id, 'detail']);
  }

}
