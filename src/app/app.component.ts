import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

/**
 * Init module
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Title of the app
   */
  title = 'OPS HA';
  /**
   * Constructor for AppComponent 
   * @param translate Service used for traslating the the content according to the user config
   */
  constructor( public translate: TranslateService ) {
    this.loadTranslationPlugin();
  }

  /**
   * Loads the translation plugin and checks the current user language
   */
  loadTranslationPlugin = () => {
    this.translate.addLangs(["en", "es", "fr", "pt"]);
    // trying to get language if it not first start
    let languageRegister = localStorage.getItem("lang") || this.translate.getBrowserLang();
    languageRegister = languageRegister.match(/en|es|fr|pt/) ? languageRegister : "en";
    localStorage.setItem("lang", languageRegister);
    this.translate.use(languageRegister);
  }
}