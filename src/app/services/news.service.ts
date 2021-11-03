//Servicio para noticias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//RUTA
import { SERVER_URL } from './serverConfig';

/**
 * Makes NewsService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  /**
   * Backend path for article 
   */
  private REST_API_SERVER = SERVER_URL + "/article";

  /**
   * Constructor for NewsService
   * @param http module used to make http requests
   */
  constructor(private httpClient: HttpClient,) { }
  
  /**
   * Request that gets news by dates
   */
  public getNews(startDate:string, endDate:string){
    return this.httpClient.get(this.REST_API_SERVER + `/${startDate}`+`/${endDate}`);
  }

  /**
   * Request that gets news by ID
   */
  public getOneNews(id:number){
    return this.httpClient.get(this.REST_API_SERVER + `/${id}`);
  }

  /**
   * Request to create a new news
   */
  public createNews(data: any){
    return this.httpClient.post(this.REST_API_SERVER, data);
  }

  /**
   * Request that updates a news
   */
  public updateNews(data:any){
    return this.httpClient.put(this.REST_API_SERVER, data);
  }

  /**
   * Request that eliminates a news by its ID
   */
  public deleteNews(id:string){
    return this.httpClient.delete(this.REST_API_SERVER + `/${id}`);
  }

}
