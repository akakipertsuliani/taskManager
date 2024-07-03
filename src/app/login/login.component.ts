import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../service/auth.service';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { LogInPayload } from '../interface/interface';
import { CookieService } from '../service/cookie.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        HeaderComponent,
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        MatProgressSpinnerModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    formGroup: FormGroup;
    isLoading: boolean = false;
    isTrue: boolean = false;
    userEmail: any = localStorage.getItem("email");
    private loginSubscription!: Subscription;

    constructor(private route: Router, private auth: AuthService, private cookie: CookieService) {
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }

    isValid() {
        const isValidForm = this.formGroup.valid;

        if (isValidForm) {
            this.isLoading = true;
            this.loginSubscription = this.auth.login(this.formGroup.value).pipe(
                tap((res: LogInPayload) => {
                    localStorage.setItem("user", JSON.stringify(res.user));
                    this.cookie.setCookie("accessToken", res.token.accessToken, 1);
                    this.cookie.setCookie("refreshToken", res.token.refreshToken, 1);
                    this.route.navigate(['/']);
                    this.isTrue = false;
                    this.isLoading = false;
                }),
                catchError(() => {
                    this.isTrue = true;
                    this.isLoading = false;
                    return '';
                })
            ).subscribe();
        } else {
            this.formGroup.markAllAsTouched();
        }
    }

    ngOnDestroy(): void {
        if (this.loginSubscription) {
          this.loginSubscription.unsubscribe();
        }
    }
}
