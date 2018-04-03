import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell.component';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './edit/product-edit.component';

import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';

const productRoutes: Routes = [
  { path: '',
    component: ProductShellComponent,
    children: [
      { path: ':id/detail', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes)
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  providers: [
    ProductService,
    ProductParameterService
  ]
})
export class ProductModule { }
