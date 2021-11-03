//Servicio para peticiones de funciones
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes FunctionsService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  
  /**
   * Constructor for FunctionsService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * petition to assign functions to a profile
   */
  public setFunctions(datos:any){
    //{id:,functions:[]}
    return this.httpClient.post(SERVER_URL+'/function_role', datos);
  }

  /**
   * petition to get functions of a profile
   */
  public getFunctions(id:number){
    //{id}
    return this.httpClient.get(SERVER_URL+'/role_functions/' + id);
  }
}
