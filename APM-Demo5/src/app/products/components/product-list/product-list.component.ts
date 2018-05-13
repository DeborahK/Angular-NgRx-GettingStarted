import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Product } from '../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() products: Product[];
  @Input() displayCode: boolean;
  @Input() selectedProduct: Product;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initialiseNewProduct = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Product>();

  pageTitle = 'Products';

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.initialiseNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }

}
