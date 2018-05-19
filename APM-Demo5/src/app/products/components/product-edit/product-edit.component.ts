import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number.validator';
import { Product } from '../../product';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnChanges, OnDestroy {
  validationMessages: {
    productName: { required: string; minlength: string; maxlength: string };
    productCode: { required: string };
    starRating: { range: string };
  };
  @Input() errorMessage: string;
  @Input() selectedProduct: Product;
  @Output() create = new EventEmitter<Product>();
  @Output() update = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() clearCurrent = new EventEmitter<void>();

  componentActive: boolean;
  productForm: FormGroup;
  product: Product | null;
  pageTitle = 'Product Edit';
  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productForm = this.fb.group({
      productName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for value changes
    this.productForm.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(
        value =>
          (this.displayMessage = this.genericValidator.processMessages(
            this.productForm
          ))
      );

    // patch form with value from the store
    const product: any = changes.selectedProduct.currentValue as Product;
    this.displayProduct(product);
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.productForm
    );
  }

  displayProduct(product: Product | null): void {
    // Set the local product property
    this.product = product;

    if (this.product) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: this.product.productName,
        productCode: this.product.productCode,
        starRating: this.product.starRating,
        description: this.product.description
      });
    }
  }

  cancelEdit(): void {
    this.displayProduct(this.product);
  }

  deleteProduct(): void {
    if (this.product && this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.delete.emit(this.product);
      }
    } else {
      this.clearCurrent.emit();
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = Object.assign({}, this.product, this.productForm.value);

        if (p.id === 0) {
          this.create.emit(p);
        } else {
          this.update.emit(p);
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
