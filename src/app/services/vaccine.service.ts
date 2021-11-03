import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Ruta
import { SERVER_URL } from './serverConfig';
/**
 * Makes VaccineService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root',
})
export class VaccineService {
  /**
   * Backend path for vaccine 
   */
  private REST_API_SERVER = SERVER_URL + '/vaccine';
  /**
   * Constructor for VaccineService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Obtain all vaccines
   */
  public getVaccines() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  /**
   * Get a vaccine by ID
   */
  public getVaccine(id: string) {
    return this.httpClient.get(this.REST_API_SERVER + `/${id}`);
  }

  /**
   * Request to create a vaccine
   */
  public createVaccine(datos: any) {
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Request to update vaccine
   */
  public updateVaccine(datos: any) {
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }

  /**
   * Request to delete a vaccine by ID
   */
  public removeVaccine(id: string) {
    return this.httpClient.delete(this.REST_API_SERVER + `/${id}`);
  }

  public addVaccineCountry(id:string, pais:string){
    //acá debería de ir le request al método 
    return this.httpClient.post(this.REST_API_SERVER+'/vaccine_country',pais)
  }
}
