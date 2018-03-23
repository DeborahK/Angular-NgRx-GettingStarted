import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  errorMessage: string;

  product: IProduct | null;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        if (param.hasOwnProperty('id')) {
          const id = +param['id'];
          this.productService.getProduct(id).subscribe(
            (product: IProduct) => this.product = product,
            (err: ErrorObservable) => this.errorMessage = err.error
          );
        }
      }
    );
  }
}
