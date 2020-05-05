import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';


/* NgRx */
import { Store } from '@ngrx/store';
import * as fromUser from '../state/user';
import * as fromRoot from '../state/app.state';
import { AuthService } from '../state/user';
import { UserPageActions } from '../state/user/actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage$: Observable<string>;
  maskUserName$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.maskUserName$ = this.store.select(fromUser.getMaskUserName);
    this.errorMessage$ = this.store.select(fromUser.getError);
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(UserPageActions.maskUserName());
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
    } else {
      this.errorMessage$ = of('Please enter a user name and password.');
    }
  }
}
