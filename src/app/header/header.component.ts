import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
    @Input() navElement2: string[] = ['Task', '/task'];
    @Input() navElement3: string[] = ['News', '/news'];
    @Input() navElement4: string[] = ['Support', '/support'];

    logOut() {
        localStorage.clear();
    }
}
