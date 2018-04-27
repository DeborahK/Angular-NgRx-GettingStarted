import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    // Homework
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
