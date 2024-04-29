import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../core/services/user-auth.service';
import { LoginService } from '../core/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      
      const roles = route.data['roles'] as string[];

console.log("roles:" + roles)
      if (roles && roles.length > 0) {
        const match = this.loginService.roleMatch(roles);

        if (match) {
          console.log("match:true")
          return true;
        } else {
          return this.router.createUrlTree(['/forbidden']);
        }
      } else {
        return true;
      }
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
