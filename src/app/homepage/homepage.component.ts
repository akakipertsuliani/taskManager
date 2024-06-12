import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  userEmail: any = localStorage.getItem("email");

  constructor(private route: Router, private auth: AuthService) {
    this.auth.checkEmailForStay(this.userEmail).subscribe(data => {
      data ? this.route.navigate(['/user']) : false;
    })
  }  
}
