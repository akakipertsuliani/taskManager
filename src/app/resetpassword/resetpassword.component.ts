import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
