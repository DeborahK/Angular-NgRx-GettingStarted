import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { vendorReducer } from './vendor.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VendorEffects } from 'src/app/vendors/vendor.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('vendors', vendorReducer),
    EffectsModule.forFeature(
      [VendorEffects]
    ),
  ]
})
export class VendorStateModule { }
