import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes TravelVaccineService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class TravelVaccineService {
  /**
   * Backend path for travel vaccine 
   */
  private REST_API_SERVER = SERVER_URL + "/travel_vaccine";
  /**
   * Constructor for TravelVaccineService
   * @param http module used to make http requests
   */
  constructor(private httpClient:HttpClient) { }

  /*********************
   **  Travel Vaccine **
   *********************/

  /**
   * Get vaccines from a country
   */
  public getCountryVaccine(idCountry:string){
    return this.httpClient.get(this.REST_API_SERVER+`/${idCountry}`);
  }

  /**
   * Obtain all countries
   */
  public setCountryVaccine(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Assign the vaccine to the country
   */
  public setTravelVaccine(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Update the vaccine
   */
  public updateTravelVaccine(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }
  /**
   * deletes the relation between the vaccine and the country
   */
  public deleteCountryVaccine(country:string, vaccine:string){
    return this.httpClient.delete(this.REST_API_SERVER+`/${country}/${vaccine}`);
  }
}
