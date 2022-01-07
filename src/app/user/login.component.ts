import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserStateFacadeService } from './state/user-state-facade.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    pageTitle = 'Log In';

    constructor(
        private authService: AuthService,
        public userStateFacade: UserStateFacadeService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    cancel(): void {
        this.router.navigate(['welcome']);
    }

    checkChanged(): void {
        this.userStateFacade.maskUserName();
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
