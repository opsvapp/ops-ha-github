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
   * Functions that the user has assigned
   */
  functions:Array<Number> = this.tokenStorageService.getFunctions();
  /**
   * Constructor for PermitsService
   * @param tokenStorageService service used to manage the user token
   */
  constructor(private tokenStorageService:TokenStorageService) { }

  /**
   * Update user functions
   */
  getFunctions(): void {
    this.functions = this.tokenStorageService.getFunctions();
  }

  /**
   * Validates if the user has permission 
   * @param fn function to validate
   * @returns True if the user has permission
   */
  validate(fn:Number):boolean{
    return this.functions.includes(fn);
  }

}
