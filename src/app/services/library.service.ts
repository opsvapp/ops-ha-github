import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from './serverConfig';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  /**
   * Library
   */
  private REST_API_SERVER = SERVER_URL + '/ha_library';

  /**
   * Library Detail
   */
  private REST_API_SERVER_DETAIL = SERVER_URL + '/ha_library_detail';

  /**
 * Get file extensions
 */
  private REST_API_SERVER_EXT = SERVER_URL + '/ha_type_file';



  constructor(private httpClient: HttpClient) { }

  /**
   * Send Article data
   * @param datos Figure that has idcountry and file
   * @returns Subscribe object
   */
  public postArticle(datos: FormData) {
    return this.httpClient.post(this.REST_API_SERVER, datos);
  }

  /**
   * Send file of an article
   * @param datos Figure that has idcountry and file
   * @returns Subscribe object
   */
  public postFile(datos: FormData) {
    return this.httpClient.post(this.REST_API_SERVER_DETAIL, datos);
  }

  /**
   * Gets all libraries
   */
  public getLibraries() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  /**
   * Gets all file extions
   */
  public getExtensions() {
    return this.httpClient.get(this.REST_API_SERVER_EXT);
  }

  /**
  * Gets one library by id
  */
  public getLibrary(id: string) {
    return this.httpClient.get(this.REST_API_SERVER + "/" + id);
  }

  /**
   * Perform the petition to the server for the massive load
   * @param datos Figure that has idcountry and file
   * @returns Subscribe object
   */
  public deleteArticle(id: string) {
    return this.httpClient.delete(this.REST_API_SERVER + "/"+id);
  }

  /**
   * Perform the petition to the server for the massive load
   * @returns Subscribe object
   */
  public deleteFile(id: string) {
    return this.httpClient.delete(this.REST_API_SERVER_DETAIL + "/"+id);
  }

//UPDATE
  /**
   * Perform the petition to the server for the massive load
   * @param datos Figure that has idcountry and file
   * @returns Subscribe object
   */
   public updateArticle(id: string,datos: FormData) {
     console.log(id);
    return this.httpClient.put(this.REST_API_SERVER + "/"+id,datos);
  }

}
