import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent
    },

    {
        path: "login",
        component: LoginComponent
    }, 

    {
        path: "singin",
        component: SingupComponent
    },

    {
        path: "resetpassword",
        component: ResetpasswordComponent
    }
];
