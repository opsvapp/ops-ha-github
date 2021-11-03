import { Injectable } from '@angular/core';

/**
 * Makes StorageService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Service to storage
 * Temporary or auxiliary values for use 
 * Between components.
 */
export class StorageService {

  /**
   * Constructor for storage service
   */
  constructor() { }

  /**
   * Store key-value
   */
  public setKey(key:string, value:string){
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key,value);
  }

  /**
   * Get value by key
   */
  public getKey(key:string):string{
    let value = window.localStorage.getItem(key) || '';
    return value;
  }

  /**
   * Verify if the key exists
   */
  public isKey(key:string):boolean{
    let value = window.localStorage.getItem(key);
    return (value)?true:false;
  }
  /**
   * Remove the key value
   */ 
  public removeKey(key:string){
    window.localStorage.removeItem(key);
  }
}
