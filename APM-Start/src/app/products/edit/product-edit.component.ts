import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild(NgForm) editForm: NgForm;
  pageTitle: string = 'Product Edit';
  errorMessage: string = '';

  private originalProduct: IProduct;
  product: IProduct;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        if (param.hasOwnProperty('id')) {
          const id = +param['id'];
          this.productService.getProduct(id).subscribe(
            (product: IProduct) => this.onProductRetrieved(product),
            (err: ErrorObservable) => this.errorMessage = err.error
          );
        }
      }
    );
  }

  onProductRetrieved(product: IProduct): void {
    // Reset the form back to pristine
    if (this.editForm) {
      this.editForm.reset();
    }

    // Display the data in the form
    // Use a copy to allow cancel.
    this.originalProduct = product;
    console.log(this.originalProduct);
    this.product = Object.assign({}, product);
    console.log(this.product);

    if (product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${product.productName}`;
    }
  }

  onCancel(): void {
    if (this.product.id === 0) {
      // Navigate back to the product list on cancel of add
      this.router.navigate(['/products']);
    } else {
      // Navigate back to the product detail
      this.router.navigate(['/products', this.product.id, 'detail']);
    }
  }

  onDelete(): void {
    if (this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.router.navigate(['/products']),
            (err: ErrorObservable) => this.errorMessage = err.error
          );
      }
    } else {
      // Don't delete, it was never saved.
      // Navigate back to the product list
      this.router.navigate(['/products']);
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.productService.saveProduct(this.product)
        .subscribe(() => {
          // Assign the changes from the copy
          Object.keys(this.product).forEach(key =>
            this.originalProduct[key] = this.product[key]
          );

          // Navigate back to the detail
          this.router.navigate(['/products', this.product.id, 'detail']);
        },
          (err: ErrorObservable) => this.errorMessage = err.error
        );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
