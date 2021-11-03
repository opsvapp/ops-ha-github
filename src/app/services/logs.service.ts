import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes LogsService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class LogsService {
    /**
   * Constructor for LogsService
   * @param http module used to make http requests
   */
  constructor(private http: HttpClient) {  }

  /**
   * Get some logs
   * @param form Form with the data used to filter the requested logs
   * @returns The response of the server with the logs that matched the filter
   */
  getLogs = async ( form: any ) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<any>(SERVER_URL+'/logs', {...form }, httpOptions)
      .toPromise();
  }
}
