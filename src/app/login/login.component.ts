import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup: FormGroup;
  isLoading: boolean = false;
  isTrue: boolean = false;

  constructor(private http: HttpClient, private route: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  isValid() {
    const isValidForm = this.formGroup.valid;
    const email = this.formGroup.get("email")?.value;
    const password = this.formGroup.get("password")?.value;

    if (isValidForm) {
      this.isLoading = true;
      this.http.post<any[]>('http://localhost:3000/api/auth/login', {email, password}).subscribe({
        next: () => {
          this.route.navigate(["/user"]);
          this.isTrue = false;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false; 
          this.isTrue = true;
        }
      })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
