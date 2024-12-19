import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable( {providedIn: 'root'})
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const isTokenValid = this.authService.isTokenValid(token);

      if (isTokenValid) {
        return true;
      }
    }

    this.router.navigate(['/sign-in'], {
      queryParams: { returnUrl: state.url }, // Optionally store the return URL
    });
    return false;
  }
}
