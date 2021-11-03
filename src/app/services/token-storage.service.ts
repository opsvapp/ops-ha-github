//Servicio para almacenaje de token JWT
import { Injectable } from '@angular/core';
/**
 * Token key
 */
const TOKEN_KEY = 'auth-token';
/**
 * user key
 */
const USER_KEY = 'auth-user';
/**
 * function key
 */
const FUNC_KEY = 'funcions';
/**
 * Makes TokenStorageService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  /**
   * Constructor for TokenStorageService
   */
  constructor() { }
  /**
   * Deletes the user token from storage and sets the language to english
   */
  public logOut(): void {
    let lang = localStorage.getItem("lang") || "en";
    window.localStorage.clear();
    localStorage.setItem("lang", lang);
  }

  /**
   * Storages the user token to auth the requests to the backend
   * @param token 
   */
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * returns the user saved token
   */
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Storages the user data into de local storage
   */
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * the user data that is on the local storage
   */
  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  /**
   * Storages the user permissions 
   */
  public saveFunctions(func:any){
    window.localStorage.removeItem(FUNC_KEY);
    window.localStorage.setItem(FUNC_KEY, JSON.stringify(func));
  }
  /**
   * returns all the permission
   */
  public getFunctions(){
    const func = window.localStorage.getItem(FUNC_KEY);
    if(func){
      return JSON.parse(func);
    }
    return {}
  }
  
}
