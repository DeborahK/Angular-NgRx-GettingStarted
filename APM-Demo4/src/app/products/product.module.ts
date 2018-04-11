import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell.component';
import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './edit/product-edit.component';
import { ProductService } from './product.service';

/* NgRx */
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effect';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    // (3) Register the effects
    EffectsModule.forRoot(
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
