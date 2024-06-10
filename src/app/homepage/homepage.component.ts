import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  userID: any = localStorage.getItem("id");

  constructor(private route: Router) {
    if (this.userID > 0) {
      route.navigate(['/user']);
    }
  }
}
