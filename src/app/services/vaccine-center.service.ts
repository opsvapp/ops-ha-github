import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';
/**
 * Makes VaccineCenterService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root',
})
export class VaccineCenterService {
  /**
   * Backend path for vaccine center 
   */
  private REST_API_SERVER = SERVER_URL + '/vaccine_center';
  /**
   * Constructor for VaccineCenterService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) {}

  /*********************
   **  Vaccine Center  **
   *********************/

  /**
   * Get vaccines by Health Center
   */
  public getVaccineCenter(idVaccineCenter: string) {
    return this.httpClient.get(this.REST_API_SERVER + `s/${idVaccineCenter}`);
  }

  /**
   * Add a vaccine to a health center
   */
  public postVaccineCenter(datos: any) {
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Update a vaccine from a health center
   */
  public putVaccineCenter(datos: any) {
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }

  /**
   * Eliminates a vaccine from a health center
   */
  public deleteVaccineCenter(idVaccine_Center: string, idVaccine: string, idCountry:string) {
    return this.httpClient.delete(
      this.REST_API_SERVER + `/${idVaccine_Center}/${idVaccine}/${idCountry}`
    );
  }
}
