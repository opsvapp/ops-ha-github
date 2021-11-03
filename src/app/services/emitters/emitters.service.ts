import { EventEmitter, Injectable } from '@angular/core';
/**
 * Makes EmittersService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})
export class EmittersService {

  /**
   * Event that emits when the user changes
   */
  userChange: EventEmitter<boolean> = new EventEmitter();
  /**
   * Event that emits when the profile changes
   */
  perfilChange: EventEmitter<boolean> = new EventEmitter();
  /**
   * Event that emits when the language changes
   */
  langChange: EventEmitter<string> = new EventEmitter();
  /**
   * Constructor for EmittersService
   */
  constructor() { }

  /**
   * Emmits and event when the user changes
   */
  public emittUserChangeEvent(value: boolean) {
    this.userChange.emit(value);
  }
  /**
   * returns the user change
   */
  public getUserChangeEmitter() {
    return this.userChange;
  }

  /**
   * Emmits and event when the profile changes
   */
  public emmittPerfilChangeEvent(value: boolean){
    this.perfilChange.emit(value);
  }

  /**
   * returns the profile change
   */
  public getPerfilChangeEmitter(){
    return this.perfilChange;
  }

  /**
   * Emmits and event when the language changes
   */
  public emmittLangChangeEvent(value: string){
    this.langChange.emit(value);
  }

  /**
   * returns the language change
   */
  public getLangChangeEmitter(){
    return this.langChange;
  }

}
