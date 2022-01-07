import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode } from './index';
import { ProductPageActions } from './actions';

@Injectable({
    providedIn: 'root',
})
export class ProductStateFacadeService {
    displayCode$: Observable<boolean> = this.store.select(getShowProductCode);
    selectedProduct$: Observable<Product | undefined | null> = this.store.select(getCurrentProduct);
    products$: Observable<Product[]> = this.store.select(getProducts);
    errorMessage$: Observable<string> = this.store.select(getError);

    constructor(private store: Store) {}

    loadProducts(): void {
        this.store.dispatch(ProductPageActions.loadProducts());
    }

    toggleProductCode(): void {
        this.store.dispatch(ProductPageActions.toggleProductCode());
    }

    initializeCurrentProduct(): void {
        this.store.dispatch(ProductPageActions.initializeCurrentProduct());
    }

    setCurrentProduct(product: Product): void {
        this.store.dispatch(
            ProductPageActions.setCurrentProduct({ currentProductId: product.id! })
        );
    }

    deleteProduct(product: Product): void {
        this.store.dispatch(ProductPageActions.deleteProduct({ productId: product.id! }));
    }

    clearCurrentProduct(): void {
        this.store.dispatch(ProductPageActions.clearCurrentProduct());
    }

    createProduct(product: Product): void {
        this.store.dispatch(ProductPageActions.createProduct({ product }));
    }

    updateProduct(product: Product): void {
        this.store.dispatch(ProductPageActions.updateProduct({ product }));
    }
}
