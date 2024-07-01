import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink, 
        CommonModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    @Input() getAuth: boolean = false;
    @Input() navElement1: string[] = ['Home', '/'];
    @Input() navElement2: string[] = ['Project', '/task'];
    @Input() navElement3: string[] = ['Support', '/support'];
    authService = inject(AuthService);

    logOut() {
        this.authService.logOut();
    }
}
