import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;

  @Output() productSelected = new EventEmitter<IProduct>();
  @Output() addSelected = new EventEmitter();
  
  products: IProduct[];
  filteredProducts: IProduct[];

  get filterBy(): string {
    return this.productParameterService.filterBy;
  }
  set filterBy(value: string) {
    this.productParameterService.filterBy = value;
  }

  get selectedProduct(): IProduct | null {
    return this.productService.currentProduct;
  }
  
  constructor(private productService: ProductService,
              private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(null);
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  onAdd(): void {
    this.addSelected.emit();
  }

  onSelected(product: IProduct): void {
    this.productSelected.emit(product);
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
