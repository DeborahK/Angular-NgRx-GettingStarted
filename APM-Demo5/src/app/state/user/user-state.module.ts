import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducer } from '../user/user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('users', reducer),
  ]
})
export class UserStateModule { }
