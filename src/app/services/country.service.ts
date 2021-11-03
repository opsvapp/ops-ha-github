//Servicio para las areas geograficas
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes contryService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  /**
   * Backend path for country 
   */
  private COUNTRY_API_SERVER = SERVER_URL + '/country';
  /**
   * Backend path for administration 1
   */
  private ADMIN1_API_SERVER = SERVER_URL + '/admin_1';
  /**
   * Backend path for  administrations 1
   */
  private ADMIN1S_API_SERVER = SERVER_URL + '/admins_1';
  /**
   * Backend path for  administration 2
   */
  private ADMIN2_API_SERVER = SERVER_URL + '/admin_2';
  /**
   * Backend path for  administrations 2
   */
  private ADMIN2S_API_SERVER = SERVER_URL + '/admins_2';

  /**
   * Constructor for CountryService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) {}

  /*********************
   ***    Country    ***
   *********************/

  /**
   * Gets all countries
   */
  public getCountries() {
    return this.httpClient.get(this.COUNTRY_API_SERVER);
  }

  /**
   * Get a country by ID
   */
  public getCountry(id: string) {
    return this.httpClient.get(this.COUNTRY_API_SERVER + `/${id}`);
  }

  /**
   * Petition to create country
   */
  public createCountry(datos: any) {
    return this.httpClient.post(this.COUNTRY_API_SERVER, datos);
  }

  /**
   * Petition to update country
   */
  public updateCountry(datos: any) {
    return this.httpClient.put(this.COUNTRY_API_SERVER, datos);
  }

  /**
   * Eliminate a country by ID
   */
  public removeCountry(id: string) {
    return this.httpClient.delete(this.COUNTRY_API_SERVER + `/${id}`);
  }

  /*********************
   ***     Admin1    ***
   *********************/

  /**
   * Get all AdminS1
   */
  public getAllAdminOne(id: string) {
    return this.httpClient.get(this.ADMIN1S_API_SERVER + `/${id}`);
  }

  /**
   * Get an admin_1 by ID
   */
  public getAdminOne(id: string) {
    return this.httpClient.get(this.ADMIN1_API_SERVER + `/${id}`);
  }

  /**
   * Petition to create admin_1
   */
  public createAdminOne(datos: any) {
    return this.httpClient.post(this.ADMIN1_API_SERVER, datos);
  }

  /**
   * Petition to update admin_1
   */
  public updateAdminOne(datos: any) {
    return this.httpClient.put(this.ADMIN1_API_SERVER, datos);
  }

  /**
   * Eliminate an admin_1 by ID
   */
  public removeAdminOne(id: string) {
    return this.httpClient.delete(this.ADMIN1_API_SERVER + `/${id}`);
  }

  /*********************
   ***     Admin2    ***
   *********************/

  /**
   * Get all AdminS2
   */
  public getAllAdminTwo(id:string) {
    return this.httpClient.get(this.ADMIN2S_API_SERVER+`/${id}`);
  }

  /**
   * Get an admin_2 by ID
   */
  public getAdminTwo(id: string) {
    return this.httpClient.get(this.ADMIN2_API_SERVER + `/${id}`);
  }

  /**
   * Petition to create admin_2
   */
  public createAdminTwo(datos: any) {
    return this.httpClient.post(this.ADMIN2_API_SERVER, datos);
  }

  /**
   * Petition to update admin_2
   */
  public updateAdminTwo(datos: any) {
    return this.httpClient.put(this.ADMIN2_API_SERVER, datos);
  }

  /**
   * Eliminate an admin_2 by ID
   */
  public removeAdminTwo(id: string) {
    return this.httpClient.delete(this.ADMIN2_API_SERVER + `/${id}`);
  }
}
