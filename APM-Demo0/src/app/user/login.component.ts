import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { AppState } from '../state/app.reducer';
import { getMaskUserName } from './state/user.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.store.pipe(
      select(getMaskUserName)
    )
    .subscribe((maskUserName) => this.maskUserName = maskUserName);
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'MASK_USER_NAME',
      payload: value
    });
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
