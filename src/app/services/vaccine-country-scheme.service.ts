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
export class VaccineCountrySchemeService {
  /**
   * Backend path for vaccine country scheme
   */
  private REST_API_SERVER = SERVER_URL + '/vaccine_country_scheme';
  /**
   * Constructor for VaccineCountrySchemeService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * It is responsible for consuming the API to obtain the data from the vaccination scheme
   * @param idCountry ID of the selected country
   * @param idScheme  Vaccination scheme ID
   * @returns Subscribe object
   */
  public getCountryVaccines(idCountry: string, idScheme:string ) {
    return this.httpClient.get(this.REST_API_SERVER + `/${idCountry}/${idScheme}`);
  }

  /**
   * Stores vaccination scheme data
   * @param datos JSON object with table data
   * @returns Subscribe object
   */
  public saveCountryScheme(datos: any) {
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

}