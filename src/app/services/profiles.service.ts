//Servicio para peticiones de perfiles
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes ProfilesService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  /**
   * Backend path for  role
   */
  private REST_API_SERVER = SERVER_URL + "/role";
  /**
   * Constructor for ProfilesService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Request to get all the roles
   */
  public getProfiles(){
    return this.httpClient.get(this.REST_API_SERVER+'s');
  }

  /**
   * Request to get the indicated role
   */
  public getProfile(id:number){
    return this.httpClient.get(this.REST_API_SERVER+`/${String(id)}`);    
  }

  /**
   * Request to create a mew role
   */
  public createProfile(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Request to update a role
   */
  public updateProfile(datos:any){
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }

  /**
   * Request to delete a role
   */
  public deleteProfile(id:number){
    return this.httpClient.delete(this.REST_API_SERVER+`/${String(id)}`);    
  }

}