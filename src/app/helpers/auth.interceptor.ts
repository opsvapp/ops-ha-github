//Se encarga de interceptar las peticiones HTTP y 
//agrega el token de autorizacion
import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
//Servicio de almacenamiento de token
import { TokenStorageService } from '../services/token-storage.service';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

/**
 * Makes AuthInterceptor injectable
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructor for AuthInterceptor
   * @param token Token service where we will storage the user token if successfully login
   * @param authService Backend auth service 
   * @param router angular Router
   */
  constructor(
    private token: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Intercepts the http request for authentication
   * @param req Request that will be made
   * @param next an Http handler 
   * @returns returns the http handled
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      "lang": localStorage.getItem("lang") || "en",
      "Authorization": this.token.getToken() ||  ""
    });
    const authReq = req.clone({
      headers
    })
    return next.handle(authReq).pipe(
      catchError(this.intercetorError)
    );
  }

  /**
   * Handles an error and redirects the user to the login page
   * @param error request error
   * @returns Error handled
   */
  intercetorError = (error: HttpErrorResponse) => {
    if(error.status == 401){
      this.authService.logOut();
      this.router.navigate(['./login']);
    }
    return throwError(error.error.message);
  }
}

/**
 * Authentication interceptor providers
 */
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];