import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell.component';
import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './edit/product-edit.component';
import { ProductService } from './product.service';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/product.reducer';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', reducer)
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
