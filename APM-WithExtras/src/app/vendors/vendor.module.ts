import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { VendorShellComponent } from './components/vendor-shell/vendor-shell.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { VendorProductsComponent } from './components/vendor-products/vendor-products.component';

/* NgRx */
import { EffectsModule } from '@ngrx/effects';
import { VendorEffects } from './vendor.effects';
import { VendorStateModule } from '../shared/state/vendors/vendor-state.module';

const vendorRoutes: Routes = [
  { path: '', component: VendorShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(vendorRoutes),
    EffectsModule.forFeature([VendorEffects]),
    VendorStateModule
  ],
  declarations: [
    VendorShellComponent,
    VendorListComponent,
    VendorProductsComponent
  ]
})
export class VendorModule { }
