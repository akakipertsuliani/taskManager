import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { UserpageComponent } from '../userpage/userpage.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [HeaderComponent, RouterLink, UserpageComponent, CommonModule],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
    authGurard: boolean = this.authService.isAuth;

    constructor(private authService: AuthService) {
        if (!this.authGurard) {
            authService.logOut();
        }
    }
}
