import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { EmailCheck, LogInPayload, SignUpPayload } from '../interface/interface';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  checkEmail(email: string): Observable<EmailCheck> {
    return this.http.post<EmailCheck>(environment.apiUrl + 'auth/checkEmail', { email });
  }

  signUp(data: any): Observable<SignUpPayload> {
    return this.http.post<SignUpPayload>(environment.apiUrl + 'auth/signup', data);
  }

  login(data: any): Observable<LogInPayload> {
    return this.http.post<LogInPayload>(environment.apiUrl + 'auth/login', data);
  }

  refreshToken(refreshToken: string): Observable<LogInPayload> {
    return this.http.post<LogInPayload>(environment.apiUrl + 'auth/token', { refreshToken });
  }

  logOut() {
    this.cookie.eraseCookie("accessToken");
    this.cookie.eraseCookie("refreshToken");
    localStorage.clear();
  }

  get isAuth(): boolean {
    return !!this.cookie.getCookie("accessToken");
  }
}
