import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { UserStateModule } from '../shared/state/user/user-state.module';

import { LoginComponent } from './components/login/login.component';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    UserStateModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
