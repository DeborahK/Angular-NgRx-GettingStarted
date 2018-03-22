import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  products: IProduct[];
  filteredProducts: IProduct[];

  get filterBy(): string {
    return this.productParameterService.filterBy;
  }
  set filterBy(value: string) {
    this.productParameterService.filterBy = value;
  }

  // Used to highlight the selected product in the list
  get selectedProduct(): IProduct | null {
    return this.productService.currentProduct;
  }

  constructor(private router: Router,
              private productService: ProductService,
              private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(null);
      },
      (err: ErrorObservable) => this.errorMessage = err.error
    );
  }

  onAdd(): void {
    // Navigate to the edit
    this.router.navigate(['/products', 0, 'edit']);
  }

  onSelected(product: IProduct): void {
    // Navigate to the detail
    this.router.navigate(['/products', product.id, 'detail']);
  }

  onValueChange(value: string): void {
    // Retain the selection
    this.filterBy = value;
    this.performFilter(value);
  }

  performFilter(filterBy: string | null): void {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      this.filteredProducts = this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }

}
