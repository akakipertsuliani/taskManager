import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  isValid() {
    const isValidForm = this.formGroup.valid;

    if (isValidForm) {
      alert("Nice");
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
