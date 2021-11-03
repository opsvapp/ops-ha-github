//Servicio para peticiones de usuarios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes UsersService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * Backend path for user 
   */
  private REST_API_SERVER = SERVER_URL + "/user";
  /**
   * Constructor for UsersService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Request all users
   */
  public getUsers(){
    return this.httpClient.get(this.REST_API_SERVER+'s');
  }

  /**
   * Request only 1 user based on the ID
   */
  public getUser(id:number){
    return this.httpClient.get(this.REST_API_SERVER+`/${String(id)}`);    
  }

  /**
   * Request to create user
   */
  public createUser(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Request to update user
   */
  public updateUser(datos:any){
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }

  /**
   * Request to remove user
   */
  public deleteUser(id:number){
    return this.httpClient.delete(this.REST_API_SERVER+`/${String(id)}`);    
  }
}