import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';


@NgModule({
  imports: [
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature(
      [ProductEffects]
    ),
  ]
})
export class ProductStateModule { }
