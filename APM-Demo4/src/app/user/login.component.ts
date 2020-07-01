import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import { getMaskUserName } from './state/user.reducer';
import * as UserActions from './state/user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName$: Observable<boolean>;

  constructor(private store: Store<State>, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.maskUserName$ = this.store.select(getMaskUserName);
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(UserActions.maskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
