import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import { maskUserName } from './state/user.actions';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private store: Store<any>,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.store.pipe(tap(val => {
      val;
      debugger;
    }), select('users')).subscribe(
      users => {
        if (users) {
          debugger;
          this.maskUserName = users.maskUserName;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(maskUserName({mask: value}));
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
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
