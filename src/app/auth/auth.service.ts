import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExparationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(name: string, email: string, password: string, avatarUrl: string) {
    return this.http
        .post<AuthResponseData>(
            'https://localhost:7231/Users/register',
            {
              name: name ,
              email: email,
              password: password,
              avatarUrl: avatarUrl
            //returnSecureToken: true,
            }
        )
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://localhost:7231/Users/login',
        {
          email: email,
          password: password,
          //returnSecureToken: true,
        }
      )
  }

}
