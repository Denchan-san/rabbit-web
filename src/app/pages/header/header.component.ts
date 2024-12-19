import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "../../shared/auth/auth.service";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class HeaderComponent {
  isLoggedIn$ = this.authService.user$.pipe(
    map((user) => !!user) // True if user is logged in
  );

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isTokenValid(); // Check user's login state
  }

  onLogin() {
    this.router.navigate(['../sign-in'], {relativeTo: this.route})
  }

  onRegister() {
    this.router.navigate(['../sign-up'], {relativeTo: this.route})
  }

  logout(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.authService.logout(); 
    this.router.navigate(['../sign-in']);
  }

  onMyProfile() {
    this.router.navigate(['../my-profile']);
  }
}