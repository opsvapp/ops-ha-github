import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//Token
import { TokenStorageService } from '../services/token-storage.service';
//Ruta
import { SERVER_URL } from './serverConfig';

/**
 * Options for http request
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
/**
 * Makes AuthService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Constructor for AuthService
   * @param http module used to make http requests
   * @param tokenStorageService Service that storages the auth token
   */
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  /**
   * Makes the login request
   * @param datos Username and password
   * @returns The login response from the server
   */
  logIn(datos: any): Observable<any> {
    return this.http.post(SERVER_URL + '/login', datos, httpOptions);
  }

  /**
   * Makes a log out request
   * @returns The logout response from the server
   */
  logOutReq():Observable<any>{
    const user = this.tokenStorageService.getUser();
    return this.http.post(SERVER_URL + '/logout', { username: user });
  }

  /**
   * Used to delete the user token from storage
   */
  logOut(){
    this.tokenStorageService.logOut();
  }
}
