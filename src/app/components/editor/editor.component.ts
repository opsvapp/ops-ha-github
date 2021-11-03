import { Component, OnInit } from '@angular/core';
//Editor config
import { AngularEditorConfig } from '@kolkov/angular-editor';
//Servicio de noticias
import { NewsService } from '../../services/news.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Validacion
import { ValidateService } from '../../services/validate.service';
//Storage
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { Subscription } from 'rxjs';

/**
 * Component for create or edit news on the system
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  //Titulos
  /**
   * Title of the article in english
   */
  title_EN: string = '';
  /**
   * Title of the article in spanish
   */
  title_ES: string = '';
  /**
   * Title of the article in portuguese
   */
  title_PT: string = '';
  /**
   * Title of the article in french
   */
  title_FR: string = '';
  //Texto enriquecido
  /**
   * Content of the article in english
   */
  htmlContentEN: string = '';
  /**
   * Content of the article in spanish
   */
  htmlContentES: string = '';
  /**
   * Content of the article in portuguese
   */
  htmlContentPT: string = '';
  /**
   * Content of the article in french
   */
  htmlContentFR: string = '';
  //Informacion de la noticia
  /**
   * Date of the article
   */
  newsDate: string = '';
  /**
   * Start date of when it will became visible to users
   */
  newsStartingDate: string = '';
  /**
   * End date of when it will stop of being visible to users
   */
  newsEndDate: string = '';
  /**
   * Url of the original article
   */
  newsURL: string = '';
  /**
   * Image that will be associated with the notice
   */
  fileToUpload: any = File;
  /**
   * Author of the notice
   */
  author: string = '';
  /**
   * URL of the saved image in the server
   */
  imageURL: string = '';
  //Modo Actualizacion
  /**
   * Flag used to show create or update content
   */
  updateMode = false;
  /**
   * Id of the article
   */
  updateId = -1;

  /**
   * Configuration of text editors
   */
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    // placeholder: 'Enter content here...',
    defaultParagraphSeparator: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'customClasses',
        // 'link',
        // 'unlink',
        'insertImage',
        'insertVideo',
        'toggleEditorMode',
        'removeFormat',
      ],
    ],
  };

  /**
   * App language
   */
  lang: string = 'en';
  /**
   * subscription for language changes
   */
  langChange: Subscription | undefined;
  /**
   * Constructor for editor component
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param newsService Service used to make requests to the backend
   * @param validateService
   * @param storage Service of local storage
   * @param translate Service used for translating the the content according to the user config
   */
  constructor(
    private newsService: NewsService,
    private toastr: ToastrService,
    private validateService: ValidateService,
    private storage: StorageService,
    private translate: TranslateService,
    private emitterService: EmittersService
  ) {}

  /**
   * Calls the backend to fill the data and locks the functions that the user doest have permission to use
   */
  ngOnInit(): void {
    //Lenguaje
    this.lang = localStorage.getItem('lang') || 'en';
    this.langChange = this.emitterService
      .getLangChangeEmitter()
      .subscribe((value: string) => {
        this.lang = value;
      });

    if (this.storage.isKey('UPDATE_ID')) {
      this.updateMode = true;
      this.updateId = parseInt(this.storage.getKey('UPDATE_ID'));
      this.newsService.getOneNews(this.updateId).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            //Set values to edit.
            let datos = response.data;
            //Titulos
            this.title_EN = datos.title_EN;
            this.title_ES = datos.title_ES;
            this.title_PT = datos.title_PT;
            this.title_FR = datos.title_FR;
            //Texto enriquecido
            this.htmlContentEN = datos.content_EN;
            this.htmlContentES = datos.content_ES;
            this.htmlContentPT = datos.content_PT;
            this.htmlContentFR = datos.content_FR;
            //Informacion de la noticia
            this.newsDate = new Date(datos.news_date)
              .toISOString()
              .substr(0, 10);
            this.newsStartingDate = new Date(datos.start_date)
              .toISOString()
              .substr(0, 10);
            this.newsEndDate = new Date(datos.end_date)
              .toISOString()
              .substr(0, 10);
            this.newsURL = datos.url;
            // this.fileToUpload=undefined;
            this.author = datos.author;
            this.imageURL = datos.img_url;
          }
        },
        (error) => {
          this.clear();
          this.storage.removeKey('UPDATE_ID');
        }
      );
    }
  }
  /**
   * Creates a new article on the database
   * sends the info using a FormData
   */
  saveNews() {
    if (this.validar()) {
      const formData = new FormData();
      formData.append('title_EN', this.title_EN);
      formData.append('title_ES', this.title_ES);
      formData.append('title_PT', this.title_PT);
      formData.append('title_FR', this.title_FR);
      formData.append('content_EN', this.htmlContentEN);
      formData.append('content_ES', this.htmlContentES);
      formData.append('content_PT', this.htmlContentPT);
      formData.append('content_FR', this.htmlContentFR);
      formData.append('news_date', this.newsDate);
      formData.append('start_date', this.newsStartingDate);
      formData.append('end_date', this.newsEndDate);
      formData.append('author', this.author);
      formData.append('url', this.newsURL);
      formData.append('image', this.fileToUpload);
      this.newsService.createNews(formData).subscribe(
        (response) => {
          this.toastr.success(
            this.translate.instant('EDITOR.SAVEDNEW'),
            this.translate.instant('EDITOR.NEWS')
          );
          this.clear();
        },
        (error) => {
          this.toastr.error(error, this.translate.instant('EDITOR.NEWS'));
        }
      );
    }
  }

  /**
   * Targets the file that will be uploaded to the server
   */
  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  /**
   * Updates an article on the database
   * sends the info using a FormData
   */
  updateNews() {
    if (this.validar()) {
      const formData = new FormData();
      formData.append('title_EN', this.title_EN);
      formData.append('title_ES', this.title_ES);
      formData.append('title_PT', this.title_PT);
      formData.append('title_FR', this.title_FR);
      formData.append('content_EN', this.htmlContentEN);
      formData.append('content_ES', this.htmlContentES);
      formData.append('content_PT', this.htmlContentPT);
      formData.append('content_FR', this.htmlContentFR);
      formData.append('news_date', this.newsDate);
      formData.append('start_date', this.newsStartingDate);
      formData.append('end_date', this.newsEndDate);
      formData.append('author', this.author);
      formData.append('url', this.newsURL);
      formData.append('image', this.fileToUpload);
      //Datos adicionales para actualizacion
      formData.append('idArticle', String(this.updateId));
      formData.append('img_url', this.imageURL);
      this.newsService.updateNews(formData).subscribe(
        (response) => {
          this.toastr.info(
            this.translate.instant('EDITOR.UPDATEDNEWS'),
            this.translate.instant('EDITOR.NEWS')
          );
        },
        (error) => {
          this.toastr.error(error, this.translate.instant('EDITOR.NEWS'));
        }
      );
    }
  }
  /**
   * Validates that all the data from the FromData is correct before sending it to the backend service
   * @returns True if all the data is correct
   */
  validar() {
    let validaciones: number = 0;
    if (
      Date.parse(this.newsStartingDate) &&
      Date.parse(this.newsEndDate) &&
      Date.parse(this.newsDate) &&
      Date.parse(this.newsEndDate) >= Date.parse(this.newsStartingDate)
    ) {
      validaciones += 1;
    } else {
      this.toastr.warning(
        this.translate.instant('EDITOR.NODATE'),
        this.translate.instant('EDITOR.NEWS')
      );
    }
    if (
      this.author.trim().length > 0 &&
      this.validateService.validarNombres(this.author)
    ) {
      validaciones += 1;
    } else {
      this.toastr.warning(
        this.translate.instant('EDITOR.NOAUTHOR'),
        this.translate.instant('EDITOR.NEWS')
      );
    }
    if (this.newsURL.trim().length > 0) {
      validaciones += 1;
    } else {
      this.toastr.warning(
        this.translate.instant('EDITOR.NOURL'),
        this.translate.instant('EDITOR.NEWS')
      );
    }

    if (this.fileToUpload && !this.updateMode) {
      if (this.fileToUpload.size > 0) {
        validaciones += 1;
      } else {
        this.toastr.warning(
          this.translate.instant('EDITOR.NOIMAGE'),
          this.translate.instant('EDITOR.NEWS')
        );
      }
    } else {
      if (!this.updateMode) {
        this.toastr.warning(
          this.translate.instant('EDITOR.NOIMAGE'),
          this.translate.instant('EDITOR.NEWS')
        );
      }
    }
    if (this.updateMode) {
      validaciones += 1;
    }

    return validaciones === 4 ? true : false;
  }

  /**
   * Cleans the data of the modal
   */
  clear() {
    //Titulos
    this.title_EN = '';
    this.title_ES = '';
    this.title_PT = '';
    this.title_FR = '';
    //Texto enriquecido
    this.htmlContentEN = '';
    this.htmlContentES = '';
    this.htmlContentPT = '';
    this.htmlContentFR = '';
    //Informacion de la noticia
    this.newsDate = '';
    this.newsStartingDate = '';
    this.newsEndDate = '';
    this.newsURL = '';
    this.fileToUpload = undefined;
    this.author = '';
  }
}
