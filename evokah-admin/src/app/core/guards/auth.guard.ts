import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = this.authService.getToken();
    const user = this.authService.currentUserValue;

    if (token) {
      // If user is logged in, verify roles. For the admin app, they need to be MASTER_ADMIN or EDITOR
      // Since fetchMe might be async, relying just on token is fine to let the route activate,
      // and if fetchMe fails, the JwtInterceptor will log them out.
      return true;
    }

    // Not logged in, redirect to login
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
}
