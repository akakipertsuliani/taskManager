import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

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
  userID: any = localStorage.getItem("id");
  private signUpSubscription!: Subscription;

  constructor(private route: Router, private auth: AuthService) {
    if (this.userID > 0) {
      route.navigate(['/user']);
    }

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
      const firstName = this.formGroup.get('firstName')?.value;
      const lastName = this.formGroup.get('lastName')?.value;
      const email = this.formGroup.get('email')?.value;
      const password = this.formGroup.get('password')?.value;
      this.isLoading = true;

      this.signUpSubscription = this.auth.signUp(firstName, lastName, email, password).subscribe(data => {
        if (data) {
          this.route.navigate(["/user"]);
          this.isTrue = false;
          this.isLoading = false;
        } else {
          this.isTrue = true;
          this.isLoading = false;
        }
      })
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
