import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
    pageTitle: string = 'Products';

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

    constructor(private productService: ProductService) { }

    ngOnInit() {
    }
}
