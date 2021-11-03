import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Ruta
import { SERVER_URL } from './serverConfig';
/**
 * Makes VaccineCountryService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root',
})
export class VaccineCountryService {
  /**
   * Backend path for vaccine_contry
   */
  private REST_API_SERVER = SERVER_URL + '/vaccine_country';
  /**
   * Constructor for VaccineCountryService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Obtain all vaccine by country
   */
  public getVaccinesCountry(idCountry:string) {
    return this.httpClient.get(this.REST_API_SERVER+`/${idCountry}`);
  }

  // /**
  //  * Get a vaccine by ID
  //  */
  // public getVaccine(id: string) {
  //   return this.httpClient.get(this.REST_API_SERVER + `/${id}`);
  // }

  /**
   * Request to create a vaccine_country 
   */
  public createVaccineCountry(datos: any) {
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  // /**
  //  * Request to update vaccine
  //  */
  // public updateVaccine(datos: any) {
  //   return this.httpClient.put(this.REST_API_SERVER, datos);
  // }

  // /**
  //  * Request to delete a vaccine by ID
  //  */
  public removeVaccineCountry(idVaccine: string,idCountry:string) {
    return this.httpClient.delete(this.REST_API_SERVER + `/${idVaccine}`+ `/${idCountry}`);
  }

  // public addVaccineCountry(id:string, pais:string){
  //   //acá debería de ir le request al método 
  //   return this.httpClient.post(this.REST_API_SERVER+'/vaccine_country',pais)
  // }
}
