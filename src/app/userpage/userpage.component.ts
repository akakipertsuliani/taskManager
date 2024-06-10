import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.scss'
})
export class UserpageComponent {
  userID: any = localStorage.getItem("id");

  constructor(private route: Router) {
    if (!this.userID) {
      route.navigate(['/']);
    }
  }
}