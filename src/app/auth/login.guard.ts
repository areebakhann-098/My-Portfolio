import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { FirebaseService } from '../feature/admin/Firebase/firebase-service.service';
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {}
 
 canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree {
  const isLoggedIn = this.authService.isAuthenticated();
  const isLoginRoute = route.routeConfig?.path === 'admin/login';

  if (!isLoggedIn && !isLoginRoute) {
    // ❌ Trying to access admin without login
    return this.router.parseUrl('/admin/login');
  }

  // if (isLoggedIn && isLoginRoute) {
  //   //  Already logged in and trying to visit login again
  //   return this.router.parseUrl('/admin/dashboard');
  // }

  return true;
}
}