import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

  constructor(private http: HttpClient, private route: Router) {
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

      this.http.post<any[]>('http://localhost:3000/api/auth/signup', {firstName, lastName, email, password}).subscribe({
        next: () => {
          alert('OK');
          this.route.navigate(["/user"]);
          this.isTrue = false;
          this.isLoading = false;
          },
          error: () => {
            this.isTrue = true;
            this.isLoading = false;
        },
        
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
