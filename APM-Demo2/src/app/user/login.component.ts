import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromUser from './state/user.reducer';
import * as userActions from './state/user.actions';
import * as fromRoot from '../state/app.state';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.store.pipe(select(fromUser.getMaskUserName)).subscribe(
      maskUserName => this.maskUserName = maskUserName
    );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new userActions.MaskUserName(value));
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
