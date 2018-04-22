import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';

    constructor(private authService: AuthService,
                private router: Router) {
    }

    cancel(): void {
        this.router.navigate(['welcome']);
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
