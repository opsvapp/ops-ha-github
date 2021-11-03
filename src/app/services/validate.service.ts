//Servicio para la validacion de campos
import { Injectable } from '@angular/core';
/**
 * Makes ValidateService available to be provided and injected as a dependency in root
 */
@Injectable({
  providedIn: 'root'
})

export class ValidateService {

  /**
   * Constructor for validate service
   */
  constructor() { }

  /**
   * validates titles
   * @param texto text to validate
   * @returns If text is valid or not
   */
  public validarTitulos(texto:string){
    let regex = /^[a-zA-Z_][^]+$/;
    return regex.test(texto.trim());
  }

  /**
   * validates names
   * @param texto text to validate
   * @returns If text is valid or not
   */
  public validarNombres(texto:string){
    let regex = /^[a-zA-ZÀ-ÿ\s]+$/g;
    return regex.test(texto.trim());
  }

  /**
   * validates numbers
   * @param texto text to validate
   * @returns If text is valid or not
   */
  public validarNumero(texto:string){
    let regex = /^(-)?[\d]+(.[\d]+)?$/;
    return regex.test(texto.trim());
  }

  /**
   * validates emails
   * @param texto text to validate
   * @returns If text is valid or not
   */
  public validarEmail(texto:string){
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(texto.trim());
  }

  /**
   * validates passwords
   * @param texto text to validate
   * @returns If text is valid or not
   */
  public validarPassword(texto:string){
    let regex = /^[^\s\t]{6,18}$/i;
    return regex.test(texto.trim());
  }

}
