import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

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
        path: "signup",
        component: SignupComponent
    },

    {
        path: "resetpassword",
        component: ResetpasswordComponent
    },

    {
        path: "user",
        component: UserpageComponent
    },

    {
        path: "**",
        component: ErrorpageComponent
    }
];
