import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
//Token service
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

/**
 * Makes AuthInterceptor injectable
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor for AuthInterceptor
   * @param token Token service where we will storage the user token if successfully login
   * @param authService Backend auth service 
   * @param router angular Router
   */
  constructor(
    private tokenStorageService:TokenStorageService,
    private authService: AuthService, 
    private router:Router
  ){}
  
  /**
   * MAkes the class to be a guard and deciding if a route can be activated
   * @param route Contains the information about a route associated with a component loaded in an outlet at a particular moment in time
   * @param state Represents the state of the router at a moment in time
   * @returns Return if navigation is cancelled, or a new UrlTree
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    if(!this.tokenStorageService.getToken()){
      this.authService.logOut();
      this.router.navigate(['./login']);
      return false;
    } else {
      return true;
    }
  }
}
