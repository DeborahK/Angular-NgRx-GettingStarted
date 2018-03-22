import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
    pageTitle: string = 'Products';
    errorMessage: string;

    get currentProduct(): IProduct | null {
      return this.productService.currentProduct;
    }
    set currentProduct(product: IProduct | null) {
      this.productService.currentProduct = product;
    }

    get monthCount(): number {
        const currentProduct = this.productService.currentProduct;
        let _monthCount = 0;

        if (currentProduct) {
            const start = new Date(currentProduct.releaseDate);
            const now = new Date();
            _monthCount = now.getMonth() - start.getMonth()
                + (12 * (now.getFullYear() - start.getFullYear()));
        }
        return _monthCount;
    }

    constructor(private router: Router,
                private route: ActivatedRoute,
                private productService: ProductService) { }

  ngOnInit() {
    // Watch for changes to the parameter
    // This code is required for deep linking
    this.route.params.subscribe(
      param => {
        if (param.hasOwnProperty('id')) {
          const id = +param['id'];
          if (!this.currentProduct || this.currentProduct.id !== id) {
            this.getProduct(id);
          }
        } else {
          this.currentProduct = null;
        }
      }
    );
  }

  // On an add, get an initialized product
  onAddSelected(): void {
    this.productService.getProduct(0).subscribe(
      product => {
        this.currentProduct = product;
        this.router.navigate(['/products', product.id, 'edit']);
      },
      error => this.errorMessage = <any>error
    );
  }

  // On a select, we already have a product so use it
  onProductSelected(product: IProduct): void {
    this.currentProduct = product;
    this.router.navigate(['/products', product.id, 'detail']);
  }

  // On a deep link, get the requested product
  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      product => this.currentProduct = product,
      error => this.errorMessage = <any>error
    );
  }
}
