import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes EffectsService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class EffectsService {
  
    /**
   * Backend path for secondary_effect 
   */
  private REST_API_SERVER = SERVER_URL + "/secondary_effect";

  /**
   * Constructor for EffectsService
   * @param http module used to make http requests
   */
  constructor(private httpClient:HttpClient) { }

  /**
   * Get all side effects
   */
  public getEffects(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  /**
   * Get a side effect by ID
   */
  public getEffect(id:string){
    return this.httpClient.get(this.REST_API_SERVER+`/${id}`);
  }
  
  /**
   * Petition to create side effect
   */
  public createEffect(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Petition to update side effect
   */
  public updateEffect(datos:any){
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }  

  /**
   * Remove an effect by ID
   */
  public removeEffect(id:string){
    return this.httpClient.delete(this.REST_API_SERVER+`/${id}`);
  }
}
