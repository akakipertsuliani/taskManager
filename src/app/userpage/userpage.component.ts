import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from '../service/cookie.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.scss'
})
export class UserpageComponent {}
