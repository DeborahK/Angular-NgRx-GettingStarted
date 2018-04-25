import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { SharedModule } from '../shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
    StoreModule.forFeature('users', reducer)
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class UserModule { }
