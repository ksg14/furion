import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private userService: UserAuthService,
    private router: Router) {}

  navigateToLogin () {
    this.router.navigateByUrl('/login');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.getAuthenticationStatus ()) {
        this.navigateToLogin ();
        return false;
      }
      return true;
  }
  
}
