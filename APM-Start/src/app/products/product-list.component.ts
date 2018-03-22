import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  products: IProduct[];
  filteredProducts: IProduct[];

  get selectedProduct(): IProduct | null {
    return this.productService.currentProduct;
  }
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(null);
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSelected(product: IProduct): void {
    this.productService.currentProduct = product;
  }

  onValueChange(value: string): void {
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
