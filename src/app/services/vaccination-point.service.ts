import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes VaccinationPointService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root',
})
export class VaccinationPointService {
  /**
   * Backend path for vaccination point 
   */
  private REST_API_SERVER = SERVER_URL + '/vaccination_point';
  /**
   * Backend path for vaccine point 
   */
  private REST_API_SERVER2 = SERVER_URL + '/vaccine_point';
  /**
   * Constructor for VaccinationPointService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets vaccination points by admin2
   */
  public getVaccinationPoints(id: string) {
    return this.httpClient.get(this.REST_API_SERVER + `s/${id}`);
  }

  /**
   * Gets a vaccination point by ID
   */
  public getVaccinePoint(id: string) {
    return this.httpClient.get(this.REST_API_SERVER + `/${id}`);
  }

  /**
   * Creates a vaccination point
   */
  public createVaccinePoint(datos: any) {
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Updates a vaccination point
   */
  public updateVaccinePoint(datos: any) {
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }

  /**
   * Eliminates a vaccination point by ID
   */
  public deleteVaccinePoint(id: string) {
    return this.httpClient.delete(this.REST_API_SERVER + `/${id}`);
  }

  /**
   * Gets vaccination points by admin2
   */
  public getVaccinePoints(id: string) {
    return this.httpClient.get(this.REST_API_SERVER2 + `s/${id}`);
  }

  /**
   * Creates a vaccine to a vaccination point
   */
  public createVaccine(datos: any) {
    return this.httpClient.post(this.REST_API_SERVER2, datos);
  }
  
  /**
   * Updates a vaccine to a vaccination point
   */
  public updateVaccine(datos: any) {
    return this.httpClient.put(this.REST_API_SERVER2, datos);
  }

  /**
   * Eliminates a vaccination point by ID
   */
  public deleteVaccine(idVaccination: string, idVaccine: string) {
    return this.httpClient.delete(this.REST_API_SERVER2 + `/${idVaccination}/${idVaccine}`);
  }

}
