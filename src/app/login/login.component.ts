import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

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
    userID: any = localStorage.getItem("id");
    private loginSubscription!: Subscription;

    constructor(private route: Router, private auth: AuthService) {
        if (this.userID > 0) {
          route.navigate(['/user']);
        }
        
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }

    isValid() {
        const isValidForm = this.formGroup.valid;
        const email = this.formGroup.get('email')?.value;
        const password = this.formGroup.get('password')?.value;

        if (isValidForm) {
            this.isLoading = true;
            this.loginSubscription = this.auth.login(email, password).subscribe((data) => {
                if (data) {
                    this.route.navigate(['/user']);
                    this.isTrue = false;
                    this.isLoading = false;
                } else {
                    this.isLoading = false;
                    this.isTrue = true;
                }
            });
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
