import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
 
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

export interface AuthResponseData {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: {
    user: {
      id: string;
      email: string;
      name: string;
      avatarUrl: string;
    };
    token: string;
  };
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup({username, email, password, avatarUrl}:{username: string, email: string, password: string, avatarUrl: string}) {
    return this.http
      .post<{ statusCode: number; isSuccess: boolean; errorMessages: string[]; result: any }>(
        'https://localhost:7231/api/UsersAuth/register',
        {
          name: username,
          email: email,
          password: password,
          avatarUrl: avatarUrl,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          if (response.isSuccess) {
            console.log('Registration successful');
            this.router.navigate(['../'])
          } else {
            console.log('Registration failed:', response.errorMessages);
          }
        })
      );
  }
  

  signin({ email, password }: { email: string, password: string }) {
    return this.http
      .post<AuthResponseData>('https://localhost:7231/api/UsersAuth/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          const userResponse = responseData.result.user;
          this.handleAuthentication(
            userResponse.id,
            userResponse.name,
            userResponse.email,
            userResponse.avatarUrl,
            responseData.result.token,
            new Date(new Date().getTime() + 3600 * 1000)
          );
        })
      );
  }
  
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This E-Mail were used already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login!';
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    id: string,
    name: string,
    email: string,
    avatarUrl: string,
    token: string,
    expiresIn: Date
  ) {
    const user = new User(id, name, email, avatarUrl, token, expiresIn);
    this.user.next(user);
    this.autoLogout(expiresIn.getTime() - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
