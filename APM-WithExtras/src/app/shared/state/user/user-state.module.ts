import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('user', userReducer)
  ]
})
export class UserStateModule { }
