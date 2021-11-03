import { Injectable } from '@angular/core';
//import { Functions as F} from '../helpers/functions.enum';
import { TokenStorageService } from '../services/token-storage.service';

/**
 * Makes PermitsService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class PermitsService {
  /**
   * Constructor for PermitsService
   * @param tokenStorageService service used to manage the user token
   */
  constructor(private tokenStorageService:TokenStorageService) { }

  /**
   * Functions that the user has assigned
   */
  functions:Array<Number> = this.tokenStorageService.getFunctions();

  /**
   * Validates if the user has permission 
   * @param fn function to validate
   * @returns True if the user has permission
   */
  validate(fn:Number):boolean{
    return this.functions.includes(fn);
  }

}
