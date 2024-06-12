import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  saveData(data: any) {
    localStorage.setItem("id", data.user.id);
    localStorage.setItem("firstName", data.user.firstName);
    localStorage.setItem("lastName", data.user.lastName);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);
  }

  private checkEmail(email: string): Observable<string> {
    return this.http.post<any>("http://localhost:3000/api/auth/checkEmail", { email }).pipe(
      map((data: any) => (data.exists ? 'emailExits' : 'emailNotExits')),
      catchError(() => of('err'))
    );
  }

  signUp(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return this.checkEmail(email).pipe(
      switchMap((checkResult: string) => {
        if (checkResult === 'emailNotExits') {
          return this.http.post<any[]>('http://localhost:3000/api/auth/signup', {firstName, lastName, email, password}).pipe(
            map((data: any) => {
              this.saveData(data);
              return true;
            }),
            catchError(() => of(false))
          );
        } else {
          return of(false);
        }
      }),
      catchError(() => of(false))
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', { email, password }).pipe(
      map((data: any) => {
        this.saveData(data);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  checkEmailForStay(email: string): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/api/auth/checkEmail', { email }).pipe(
      map((data: any) => {
        return data.exists ? true : false;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
