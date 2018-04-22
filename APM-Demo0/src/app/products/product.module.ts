import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell.component';
import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './edit/product-edit.component';
import { ProductService } from './product.service';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes)
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
