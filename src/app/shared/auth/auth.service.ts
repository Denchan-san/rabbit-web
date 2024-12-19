import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User, UserRole, UserCredentials } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>({
    id: 1,
    roles: [UserRole.Admin],
    username: '123123',
  });
  hasAdminPermission$: Observable<boolean> = this.user$.pipe(
    map((user: User | null) => !!user?.roles.includes(UserRole.Admin))
  );

  private basic = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<UserCredentials> {
    return this.http
      .post<UserCredentials>(this.basic + '/login', {
        username,
        password,
      })
      .pipe(
        map((response: UserCredentials) => {
          if (response.token) {
            // Save token to localStorage
            localStorage.setItem('jwtToken', response.token);

            // Validate token and update user state
            this.isTokenValid(response.token);
          }
          return response;
        })
      );
  }

  signUp({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Observable<UserCredentials> {
    return this.http.post<UserCredentials>(this.basic + '/register', {
      username,
      email,
      password,
    });
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('jwtToken');
    if (!token || !this.isTokenValid(token)) {
      return null;
    }

    const decodedToken: any = jwtDecode(token);

    return decodedToken.userId || null; // Return userId, or null if not available
  }

  checkIfAdminFromToken() {
    const token = localStorage.getItem('jwtToken');
    if (!token || !this.isTokenValid(token)) {
      return null;
    }
  
    const decodedToken: any = jwtDecode(token);
  
    // Check if the decodedToken contains groups and if the 'admin' role is present
    if (decodedToken?.groups) {
      const roles = decodedToken.groups[0].split(','); // Split the string into an array of roles
      if (roles.includes('admin')) {
        return true; // User has Admin role
      }
    }
  
    return false; // User does not have Admin role
  }
  

  isTokenValid(token?: string): boolean {
    try {
      const jwtToken = token || localStorage.getItem('jwtToken');
      if (!jwtToken) {
        // No token found, reset user state
        this.user$.next(null);
        return false;
      }

      const decodedToken: {
        id: number;
        sub: string;
        roles: UserRole[];
        exp: number;
      } = jwtDecode(jwtToken);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token expired, reset user state
        this.user$.next(null);
        return false;
      }

      // Valid token, update user state
      this.user$.next({
        id: decodedToken.id,
        username: decodedToken.sub,
        roles: decodedToken.roles,
      });
      return true;
    } catch (error) {
      // Invalid token, reset user state
      this.user$.next(null);
      return false;
    }
  }

  // Getter for login state
  get isLoggedIn(): boolean {
    return this.isTokenValid();
  }

  logout(): void {
    localStorage.removeItem('jwtToken'); // Clear the token
    this.user$.next(null); // Reset user state
  }
}
