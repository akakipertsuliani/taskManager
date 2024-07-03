import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription, throwError, of, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { EmailCheck, SignUpPayload } from '../interface/interface';
import { CookieService } from '../service/cookie.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    HeaderComponent, 
    ReactiveFormsModule, 
    CommonModule, 
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  formGroup: FormGroup;
  isTrue: boolean = false;
  isLoading: boolean = false;
  userEmail: any = localStorage.getItem("email");
  private signUpSubscription!: Subscription;

  constructor(private route: Router, private auth: AuthService, private cookie: CookieService) {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  isValid() {
    const isValidForm = this.formGroup.valid;

    if (isValidForm) {
      this.isLoading = true;

      this.signUpSubscription = this.auth.checkEmail(this.formGroup.get('email')?.value).pipe(
        switchMap((res: EmailCheck) => {
          if (!res.emailExists) {
            return this.auth.signUp(this.formGroup.value);
          } else {
            this.isTrue = true;
            this.isLoading = false;
            return throwError('Email already exists');
          }
        }),
        tap((res: SignUpPayload) => {
          localStorage.setItem("user", JSON.stringify(res.user));
          this.cookie.setCookie("accessToken", res.token.accessToken, 1);
          this.cookie.setCookie("refreshToken", res.token.refreshToken, 1);
          this.route.navigate(['/']);
          this.isTrue = false;
          this.isLoading = false;
        }),
        catchError((error) => {
          this.isTrue = true;
          this.isLoading = false;
          return "";
        })
      ).subscribe();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }
}
