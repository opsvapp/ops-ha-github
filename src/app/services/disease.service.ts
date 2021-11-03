import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes DiseaseService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  /**
   * Backend path for disease 
   */
  private REST_API_SERVER = SERVER_URL + "/disease";

  /**
   * Constructor for DiseaseService
   * @param http module used to make http requests
   */
  constructor(private httpClient:HttpClient) { }

  /**
   * Obtain all diseases
   */
  public getDiseases(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  /**
   * Get a disease by ID
   */
  public getDisease(id:string){
    return this.httpClient.get(this.REST_API_SERVER+`/${id}`);
  }
  
  /**
   * Petition to create diseases
   */
  public createDisease(datos:any){
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Petition to update diseases
   */
  public updateDisease(datos:any){
    return this.httpClient.put(this.REST_API_SERVER, datos);
  }  

  /**
   * Eliminates a disease by ID
   */
  public removeDisease(id:string){
    return this.httpClient.delete(this.REST_API_SERVER+`/${id}`);
  }
}
