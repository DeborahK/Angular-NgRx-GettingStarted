import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

/* ngrx */
import { Store } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-edit',
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
              private store: Store<fromProduct.State>,
              private productService: ProductService) {
  }

  // Need to handle unsubscribe!
  ngOnInit() {
    this.store.select(state => state.productFeature.product.currentProduct).subscribe(product => {
      if (product) {
        this.onProductRetrieved(product);
      }
      this.product = product;
    });
  }

  onProductRetrieved(product: IProduct): void {
    // TODO: Change to reactive forms
    // Reset the form back to pristine
    // if (this.editForm) {
    //   this.editForm.reset();
    // }

    if (product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${product.productName}`;
    }
  }

  onCancel(): void {
    // TODO: Abort the edit
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
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      // Change to obtain the values from the reactive form.
      this.store.dispatch(new productActions.UpdateProductAction(this.product));
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
