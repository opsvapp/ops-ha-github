import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes HealthCenterService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class HealthCenterService {
  /**
   * Backend path for health center 
   */
  private REST_API_SERVER = SERVER_URL + "/health_center";
  /**
   * Constructor for HealthCenterService
   * @param http module used to make http requests
   */
  constructor(private httpClient:HttpClient) { }

  /*********************
   **  Health Center  **
   *********************/

  /**
   * Get the health centers of a country
   */
  public getHealthCenters(idCountry:string){
    return this.httpClient.get(this.REST_API_SERVER+`s/${idCountry}`);
  }

  /**
   * Create a Health Center
   */
  public postHealthCenter(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Update a Health Center
   */
  public putHealthCenter(datos:any){
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }

  /**
   * Remove a health center
   */
  public deleteHealthCenter(idVaccine_Center:string,){
    return this.httpClient.delete(this.REST_API_SERVER+`/${idVaccine_Center}`);
  }

}
