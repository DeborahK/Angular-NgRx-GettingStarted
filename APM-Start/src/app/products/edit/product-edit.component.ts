import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild(NgForm) editForm: NgForm;
  pageTitle: string = 'Product Edit';
  errorMessage: string;

  private originalProduct: IProduct;
  private editedProduct: IProduct | null;

  get product(): IProduct | null {
    if (this.productService.currentProduct && 
        (!this.editedProduct || this.productService.currentProduct.id !== this.editedProduct.id)) {
      this.onProductRetrieved(this.productService.currentProduct);
    }
    return this.editedProduct;
  }

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Watch for changes to the parameter
    // This notifies the component when the user
    // changes from an edit to an add operation
    this.route.params.subscribe(
      param => {
        this.editedProduct = null;
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
    this.editedProduct = Object.assign({}, product);

    if (product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${product.productName}`;
    }
  }

  onCancel(): void {
    if (this.productService.currentProduct.id === 0) {
      // Navigate back to the product list on cancel of add
      this.router.navigate(['/products']);
    } else {
      // Navigate back to the product detail
      this.router.navigate(['/products', this.productService.currentProduct.id, 'detail']);
    }
  }

  onDelete(): void {
    if (this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.productService.saveProduct(this.editedProduct)
        .subscribe(() => {
          // Assign the changes from the copy
          Object.keys(this.editedProduct).forEach(key =>
            this.originalProduct[key] = this.editedProduct[key]
          );

          this.onSaveComplete();
        },
          (error: any) => this.errorMessage = <any>error
        );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset back to pristine
    this.editForm.reset(this.editForm.value);

    // Navigate back to the detail
    this.router.navigate(['/products', this.productService.currentProduct.id, 'detail']);
  }
}
