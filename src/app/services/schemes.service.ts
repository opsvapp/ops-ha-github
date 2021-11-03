import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';
/**
 * Makes SchemesService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class SchemesService {
  /**
   * Backend path for scheme 
   */
  private REST_API_SERVER = SERVER_URL + "/scheme";
  /**
   * Constructor for SchemesService
   * @param http module used to make http requests
   */
  constructor(private httpClient:HttpClient) { }

  /**
   * Get all the schemes
   */
  public getSchemes(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  /**
   * Get a scheme by ID
   */
  public getScheme(id:string){
    return this.httpClient.get(this.REST_API_SERVER+`/${id}`);
  }
  
  /**
   * Petition to create scheme
   */
  public createScheme(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Petition to update scheme
   */
  public updateScheme(datos:any){
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }  

  /**
   * Remove a scheme by ID
   */
  public removeScheme(id:string){
    return this.httpClient.delete(this.REST_API_SERVER+`/${id}`);
  }
}
