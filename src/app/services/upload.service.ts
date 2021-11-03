import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from './serverConfig';
/**
 * Makes UploadService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  /**
   * Backend path for load file 
   */
  private REST_API_SERVER = SERVER_URL + '/load_file';
  private REST_API_SERVER_DISEASE = SERVER_URL + '/load_file/disease';
  private REST_API_SERVER_VACCINE_COUNTRY = SERVER_URL + '/load_file/vaccine_country';
  private REST_API_SERVER_SCHEME = SERVER_URL + '/load_file/scheme';
  private REST_API_SERVER_HEALTH_CENTER = SERVER_URL + '/load_file/health_center';
  private REST_API_SERVER_VACCINATION_POINT = SERVER_URL + '/load_file/vaccination_point';
  /**
   * Constructor for UploadService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Perform the petition to the server for the massive load
   * @param datos Figure that has idcountry and file
   * @returns Subscribe object
   */
  public uploadFile(datos:FormData){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  public uploadFileDisease(datos:FormData){
    return this.httpClient.post(this.REST_API_SERVER_DISEASE, datos);
  }

  public uploadFileScheme(datos:FormData){
    return this.httpClient.post(this.REST_API_SERVER_SCHEME, datos);
  }

  public uploadFileVaccineCountry(datos:FormData){
    return this.httpClient.post(this.REST_API_SERVER_VACCINE_COUNTRY, datos);
  }

  public uploadFileHealthCenter(datos:FormData){
    return this.httpClient.post(this.REST_API_SERVER_HEALTH_CENTER, datos);
  }

  public uploadFileVaccinationPoint(datos:FormData){
    return this.httpClient.post(this.REST_API_SERVER_VACCINATION_POINT, datos);
  }
}
