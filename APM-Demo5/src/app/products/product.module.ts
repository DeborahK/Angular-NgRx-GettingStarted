import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell.component';
import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './edit/product-edit.component';

import { ProductService } from './product.service';
import { ProductEffects } from './state/product.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/product.reducer';

const productRoutes: Routes = [
  { path: '',     component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    // (3) Add this using forFeature
    StoreModule.forFeature('productFeature', {
      product: reducer
    }),
    // (4) Change this to forFeature
    // Registered when lazy loaded.
    EffectsModule.forFeature(
      [ ProductEffects ]
    ),
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  providers: [
    ProductService,
    ProductEffects
  ]
})
export class ProductModule { }
