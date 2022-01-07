import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';
import { EffectsModule, StoreModule } from 'mini-rx-store-ng';

const productRoutes: Routes = [{ path: '', component: ProductShellComponent }];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(productRoutes),
        StoreModule.forFeature('products', productReducer),
        EffectsModule.register([ProductEffects]),
    ],
    declarations: [ProductShellComponent, ProductListComponent, ProductEditComponent],
})
export class ProductModule {}
