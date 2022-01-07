import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductStateFacadeService } from '../state/product-state-facade.service';

@Component({
    templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
    constructor(public productState: ProductStateFacadeService) {}

    ngOnInit(): void {
        this.productState.loadProducts();
    }

    checkChanged(): void {
        this.productState.toggleProductCode();
    }

    newProduct(): void {
        this.productState.initializeCurrentProduct();
    }

    productSelected(product: Product): void {
        this.productState.setCurrentProduct(product);
    }

    deleteProduct(product: Product): void {
        this.productState.deleteProduct(product);
    }

    clearProduct(): void {
        this.productState.clearCurrentProduct();
    }

    saveProduct(product: Product): void {
        this.productState.createProduct(product);
    }

    updateProduct(product: Product): void {
        this.productState.updateProduct(product);
    }
}
