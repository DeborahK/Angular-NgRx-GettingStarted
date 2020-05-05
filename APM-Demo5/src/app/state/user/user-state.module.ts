import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { userReducer } from '../user/user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('users', userReducer),
  ]
})
export class UserStateModule { }
