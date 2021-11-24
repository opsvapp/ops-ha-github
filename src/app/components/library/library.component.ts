import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
//Permisos
import { PermitsService } from '../../services/permits.service';

import { Subscription } from 'rxjs';
import { EmittersService } from '../../services/emitters/emitters.service';
import { CountryService } from '../../services/country.service';
//Send File Service
import { LibraryService } from '../../services/library.service';

//Editor config
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  //Library Data

  title_EN: string = ''; //Title of the library in english
  title_ES: string = ''; //Title of the library in spanish
  title_PT: string = '';//Title of the library in portuguese
  title_FR: string = '';//Title of the library in french
  htmlContentEN: string = '';//Content of the library in english
  htmlContentES: string = '';//Content of the library in spanish
  htmlContentPT: string = '';//Content of the library in portuguese
  htmlContentFR: string = '';//Content of the library in french
  author: string = '';//Author of the library

  //Modal Data
  display_EN: string = '';//Name of the document in english
  display_ES: string = ''; //Name of the document in spanish
  display_PT: string = '';//Name of the document in portuguese
  display_FR: string = '';//Name of the document in french
  fileToUpload: any = File; //Document associated with the library
  priorityId: string = '-1'; //Priority id of the library
  countryName: string = '-1';//Country id that owns the library
  countryNameAux: string = '-1';//Country id that owns the library aux

  //Permisos
  canReview = true; //Permission used to let the user Review
  canCreate = true; //Permission used to let the user Create
  canUpdate = true; //Permission used to let the user Update
  canDelete = true; //Permission used to let the user Delete

  //Language
  lang: string = "en"; //Language used in the app
  langChange: Subscription | undefined; //subscribes to language changes

  //Listas
  countryList: Array<any> = []; //List of countries
  articleList: Array<any> = []; //List of articles
  extensionList: Array<any> = []; //List of extensions
  articleData: Array<any> = []; //Article Data
  myFiles: any[] = []; //Files array
  filesArray: any[] = []; //Files array aux
  fileAux: any[] = []; //Article Data aux

  //Variables
  fileExtensions: string = ''; //String for file extensions
  isRegional: boolean = false; //Boolean for regional users
  isCountry: boolean = false; //Boolean for country users
  loading: boolean = false; //Boolean for spinner
  loadingcreate: boolean = false; //Boolean for spinner no.2

  fileId = -1; //Id of the array size
  canAddFiles: boolean = false; //Boolean for adding files
  canCreateArticle: boolean = false; //Boolean for formData
  newdoc: boolean = true;

  //Update Data
  u_title_EN: string = ''; //Title of the library in english
  u_title_ES: string = ''; //Title of the library in spanish
  u_title_PT: string = '';//Title of the library in portuguese
  u_title_FR: string = '';//Title of the library in french
  u_htmlContentEN: string = '';//Content of the library in english
  u_htmlContentES: string = '';//Content of the library in spanish
  u_htmlContentPT: string = '';//Content of the library in portuguese
  u_htmlContentFR: string = '';//Content of the library in french
  u_author: string = '';//Author of the library
  u_articleList: any = []; //array for files of an article
  u_countryName: string = '-1'; //Country of the updated article
  u_priorityId: string = '-1'; //Priority id of the updated article
  idLibrary: string = '-1'; //String for selected library
  public isCollapsed = false; //boolean for collapsed data

  /**
   * Reference for input file
   */
  @ViewChild('myInput')
  myInputVariable: ElementRef | undefined;

  /**
   * Reference for input update file
   */
   @ViewChild('myInputUpdate')
   myInputVariableUpdate: ElementRef | undefined;

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
     * Constructor for disease component
     * @param toastr Service used to show informative messages to the user and let him know whats happening
     * @param libraryService Service used to make requests to the backend
     * @param permitsService Service used for filtering info according to the user permissions
     * @param translate Service used for translating the the content according to the user config
     * @param emitterService Services used to emit events
     */
  constructor(
    private permitsService: PermitsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private emitterService: EmittersService,
    private countryService: CountryService,
    private libraryService: LibraryService) {

  }

  /**
     * Initializer
     */
  ngOnInit(): void {
    //Cargar listado de paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.data.length > 0) {
          this.countryList = response.data;
          //Elimina los paises del listado si el usuario no es regional
          if (localStorage.getItem('regional') == 'false') {
            this.isRegional = false;
            this.isCountry = true;
            let pais: any = this.countryList.find(
              (element) =>
                element.idCountry == localStorage.getItem('idCountry')
            );
            this.countryList = [];
            this.countryList.push(pais);
          } else {
            this.isRegional = true;
            this.isCountry = false;
            let indice = this.countryList.findIndex(
              (element) => element.idCountry == 1
            );
            this.countryList.splice(indice, 1);
          }
        } else {
          this.toastr.warning(
            this.translate.instant('COUNTRY.NOCOUNTRIES'),
            this.translate.instant('COUNTRY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('UPLOAD.TITLE'));
      }
    );

    this.getLibraries();

    //Cargar listado de extensiones
    this.libraryService.getExtensions().subscribe(
      (response: any) => {
        if (response) {
          this.extensionList = response;
          for (let index = 0; index < this.extensionList.length; index++) {
            const element = this.extensionList[index];
            if (index == this.extensionList.length - 1) {
              this.fileExtensions += element;
            }
            else {
              this.fileExtensions += element + ',';
            }
          }
        }
        else {
          this.toastr.warning(
            this.translate.instant('LIBRARY.NOEXTENSIONS'),
            this.translate.instant('LIBRARY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );

    //Translate
    this.lang = localStorage.getItem('lang') || 'en';
    this.langChange = this.emitterService
      .getLangChangeEmitter()
      .subscribe((value: string) => {
        this.lang = value;
      });
  }

  /**
   * Unsubscribes from language changes
   */
  ngOnDestroy(): void {
    this.langChange?.unsubscribe();
  }


  /**
   * Handles file input
   * @param event Event of uploading a file
   */
  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  /**
   * Sends the article
   */
  upload() {
    if (this.validate()) {
      let count = 0;
      let datos = new FormData();
      //ARTICULO 
      datos.append('title_EN', this.title_EN);
      datos.append('title_ES', this.title_ES);
      datos.append('title_PT', this.title_PT);
      datos.append('title_FR', this.title_FR);
      datos.append('content_EN', this.htmlContentEN);
      datos.append('content_ES', this.htmlContentES);
      datos.append('content_PT', this.htmlContentPT);
      datos.append('content_FR', this.htmlContentFR);
      datos.append('author', this.author);
      if (this.countryName == "1" && this.isRegional) {
        this.countryNameAux="all"
        datos.append('countryName', this.countryNameAux);
      }
      else{
        datos.append('countryName', this.countryName);
      }
      datos.append('priority_order', this.priorityId);
      this.canAddFiles = true;
      this.canCreateArticle = true;

      this.libraryService.postArticle(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant('LIBRARY.SUCCESS'),
            this.translate.instant('LIBRARY.TITLE')
          );
          //VARIABLE DEL ID DEL ARTICULO IDARTICULO 
          this.idLibrary = response.data.idLibrary;
          this.canAddFiles = true;
          this.canCreateArticle = true;

          this.getLibraries();
          this.getFilesById(this.idLibrary);
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
        }
      );

    }

  }

  /**
   * Get All Libraries
  */
  getLibraries() {
    //Cargar listado de articulos
    this.libraryService.getLibraries().subscribe(
      (response: any) => {
        if (response) {
          this.articleList = response;
        }
        else {
          this.toastr.warning(
            this.translate.instant('LIBRARY.NOARTICLES'),
            this.translate.instant('LIBRARY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );
  }

  /***
   * Get Files from a Library 
   */
  getFilesById(idLibrary: string) {
    //Cargar data de un artículo
    this.libraryService.getLibrary(idLibrary).subscribe(
      (response: any) => {
        if (response) {
          this.filesArray = [];
          this.filesArray = response.Ha_Library_Detail;
        }
        else {
          this.toastr.warning(
            this.translate.instant('LIBRARY.NOARTICLES'),
            this.translate.instant('LIBRARY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );
  }

  /**
   * Validates if the form is valid
   * @returns True if the form is valid
   */
  validate() {
    let valid: number = 0;
    this.author = localStorage.getItem('auth-user') || "";
    this.author = this.author.replace("\"", ""); 
    this.author = this.author.replace("\"", ""); 
    //Title validations
    if (this.title_EN == "") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.EMPTYTITLE_EN'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.title_ES == "") {
      if (this.title_EN != "") {
        this.title_ES=this.title_EN;
      }
    }
    if (this.title_FR == "") {
      if (this.title_EN != "") {
        this.title_FR=this.title_EN;
      }
    }
    if (this.title_PT == "") {
      if (this.title_EN != "") {
        this.title_PT=this.title_EN;
      }
    }

    //Content validation
    if (this.htmlContentEN == "") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.HTMLCONTENT_EN'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.htmlContentES == "") {
      if (this.htmlContentEN != "") {
        this.htmlContentES = this.htmlContentEN;
      }
    }
    if (this.htmlContentFR == "") {
      if (this.htmlContentEN != "") {
        this.htmlContentFR = this.htmlContentEN;
      }
    }
    if (this.htmlContentPT == "") {
      if (this.htmlContentEN != "") {
        this.htmlContentPT = this.htmlContentEN;
      }
    }
    
    //DropDown validation
    if (this.priorityId == "-1") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.PRIORITY_V'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.countryName == "-1") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.COUNTRY_V'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    return true;
  }

  /**
  * Add Document to the library
  */
  addDocument() {
    if (this.validateModal()) {
      this.loadingcreate=true;
      this.canAddFiles=false;
      this.fileId++;
      try {
        let splitted = "";
        splitted = this.fileToUpload.name.split(".");
        let fileNamesplitted = "";
        for (let index = 0; index < splitted.length; index++) {
          if (index == (splitted.length - 1)) {
          }
          else if (index == (splitted.length - 2)) {
            fileNamesplitted += splitted[index];
          }
          else {
            fileNamesplitted += splitted[index] + ".";
          }

        }
        let splitArr2 = this.fileToUpload.type.split("/");
        let sizeInBytes: number = this.fileToUpload.size;

        //Object to show
        let obj = {
          "file": this.fileToUpload,
          "name": this.fileToUpload.name,
          "displayName": fileNamesplitted,
          "type": splitArr2[1],
          "size": sizeInBytes / 1000000,
          "titulo_EN": this.display_EN,
          "titulo_ES": this.display_ES,
          "titulo_FR": this.display_PT,
          "titulo_PT": this.display_FR,
          "id": this.fileId
        }
        this.myFiles = [];
        this.myFiles.push(obj);
        //SEND FILE 
        if (this.validateModal()) {
          let datos = new FormData();
          this.myFiles.forEach((element, index) => {
            datos.append(`archivo[${index}][idLibrary]`, this.idLibrary)
            datos.append(`archivo[${index}][file]`, element.file)
            datos.append(`archivo[${index}][name]`, element.name)
            datos.append(`archivo[${index}][displayName]`, element.displayName)
            datos.append(`archivo[${index}][type]`, element.type)
            datos.append(`archivo[${index}][size]`, element.size)
            datos.append(`archivo[${index}][titulo_EN]`, element.titulo_EN)
            datos.append(`archivo[${index}][titulo_ES]`, element.titulo_ES)
            datos.append(`archivo[${index}][titulo_FR]`, element.titulo_FR)
            datos.append(`archivo[${index}][titulo_PT]`, element.titulo_PT)
            datos.append(`archivo[${index}][id]`, element.id)
          });

          this.libraryService.postFile(datos).subscribe(
            (response: any) => {
              this.loadingcreate=false;
              this.canAddFiles=true;
              this.toastr.success(
                this.translate.instant('LIBRARY.FILE_SUCCESS'),
                this.translate.instant('LIBRARY.TITLE')
              );
              this.getFilesById(this.idLibrary);
              this.getLibraries();
            },
            (error: any) => {
              this.loadingcreate=false;
              this.canAddFiles=true;
              this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
            }
          );
        }
        this.cancelDocument();
      } catch (error) {
      }


    }
  }

  /**
   * Validates if the modal is valid
   * @returns True if the form is valid
   */
  validateModal() {
    if (this.fileToUpload == File || this.fileToUpload==undefined) {
      this.toastr.warning(
        this.translate.instant('LIBRARY.FILE_V'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.display_EN == "") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.EMPTYTITLE_EN'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }

    if (this.display_ES == "") {
      if (this.display_EN != "") {
        this.display_ES=this.display_EN;
      }
    }
    if (this.display_FR == "") {
      if (this.display_EN != "") {
        this.display_FR=this.display_EN;
      }
    }
    if (this.display_PT == "") {
      if (this.display_EN != "") {
        this.display_PT=this.display_EN;
      }
    }

    if (this.fileToUpload) {
      let valid_file = 0;
      let sizeInBytes: number = this.fileToUpload.size;
      if (sizeInBytes == 0 || sizeInBytes > 5e+7) {
        this.toastr.warning(
          this.translate.instant('LIBRARY.FILES_SIZE_V'),
          this.translate.instant('LIBRARY.EMPTYTITLE')
        );
        valid_file++;
      }
      if (valid_file > 0) return false;
    }
    
    return true;
  }

  /**
  * Deletes file form array
  * @param idElement id for element to be deleted
  */
  deleteDocument(idElement: string) {
    //Enviar Id de Artículo a eliminar
    this.libraryService.deleteFile(idElement).subscribe(
      (response: any) => {
        this.toastr.success(
          this.translate.instant('LIBRARY.DELETE_FILE_SUCCESS'),
          this.translate.instant('LIBRARY.TITLE')
        );
        //Actualizar tabla
        this.getFilesById(this.idLibrary);
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );
  }

  /**
  * Cleans the file data
  */
  cancelDocument() {
    if (this.myInputVariable) {
      this.myInputVariable.nativeElement.value = "";
    }
    if (this.myInputVariableUpdate) {
      this.myInputVariableUpdate.nativeElement.value = "";
    }
    this.fileToUpload = File;
    this.display_EN = "";
    this.display_ES = "";
    this.display_FR = "";
    this.display_PT = "";
  }

  /**
   * Delete Library
   */
  deleteArticle(idArticle: string) {
    this.libraryService.deleteArticle(idArticle).subscribe(
      (response: any) => {
        this.toastr.success(
          this.translate.instant('LIBRARY.DELETE_SUCCESS'),
          this.translate.instant('LIBRARY.TITLE')
        );
        this.clear();
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );


  }

  /**
   * Cleans the data of the library form
   */
  clear() {
    this.canCreateArticle = false;
    this.canAddFiles = false;
    this.filesArray = [];
    this.fileAux = [];
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
    this.fileToUpload = File;
    this.author = '';
    this.countryName = '-1';
    this.priorityId = '-1';
    this.getLibraries();
  }

  /**
   * Cleans the data of the update form
   */
  clearUpdate() {
    this.canCreateArticle = false;
    this.canAddFiles = false;
    this.fileAux = [];
    this.filesArray = [];
    //Titulos
    this.u_title_EN = '';
    this.u_title_ES = '';
    this.u_title_PT = '';
    this.u_title_FR = '';
    //Texto enriquecido
    this.u_htmlContentEN = '';
    this.u_htmlContentES = '';
    this.u_htmlContentPT = '';
    this.u_htmlContentFR = '';
    //Informacion de la noticia
    this.fileToUpload = File;
    this.author = '';
    this.countryName = '-1';
    this.priorityId = '-1';
    this.getLibraries();
  }

  /*********************** UPDATE *************************/
  /**
   * Get data from Library by id
   */
  getArticleData(idArticle: string) {
    this.idLibrary = idArticle;
    this.isCollapsed = false;
    //Cargar data de un artículo
    this.libraryService.getLibrary(idArticle).subscribe(
      (response: any) => {
        if (response) {
          this.u_title_EN = response.Ha_Library.title_EN;
          this.u_title_ES = response.Ha_Library.title_ES;
          this.u_title_PT = response.Ha_Library.title_PT;
          this.u_title_FR = response.Ha_Library.title_FR;

          this.u_htmlContentEN = response.Ha_Library.content_EN;
          this.u_htmlContentES = response.Ha_Library.content_ES;
          this.u_htmlContentPT = response.Ha_Library.content_PT;
          this.u_htmlContentFR = response.Ha_Library.content_FR;
          this.u_priorityId = response.Ha_Library.priority_order;
          this.u_countryName = response.Ha_Library.idCountry;
          if (this.u_countryName == "Regional") {
            this.u_countryName = "1";
          }
          this.u_author = response.Ha_Library.author;
          this.u_articleList = response.Ha_Library_Detail;
        }
        else {
          this.toastr.warning(
            this.translate.instant('LIBRARY.NOARTICLES'),
            this.translate.instant('LIBRARY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );

  }

  /***
   * Get files from Library by id
   */
  getUpdatedFilesById(idLibrary: string) {
    //Cargar data de un artículo
    this.libraryService.getLibrary(idLibrary).subscribe(
      (response: any) => {
        if (response) {
          this.u_articleList = [];
          this.u_articleList = response.Ha_Library_Detail;
        }
        else {
          this.toastr.warning(
            this.translate.instant('LIBRARY.NOARTICLES'),
            this.translate.instant('LIBRARY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );
  }

  /**
   * Updates a library
   */
  update() {
    if (this.validateUpdate()) {
      let idLibrary = this.idLibrary;
      let datos = new FormData();
      datos.append('title_EN', this.u_title_EN);
      datos.append('title_ES', this.u_title_ES);
      datos.append('title_PT', this.u_title_PT);
      datos.append('title_FR', this.u_title_FR);
      datos.append('content_EN', this.u_htmlContentEN);
      datos.append('content_ES', this.u_htmlContentES);
      datos.append('content_PT', this.u_htmlContentPT);
      datos.append('content_FR', this.u_htmlContentFR);
      datos.append('author', this.u_author);
      if (this.u_countryName == "1" && this.isRegional) {
        this.u_countryName = "all";
      }
      datos.append('countryName', this.u_countryName);
      datos.append('priority_order', this.u_priorityId);

      this.libraryService.updateArticle(idLibrary, datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant('LIBRARY.UPDATE_SUCCESS'),
            this.translate.instant('LIBRARY.TITLE')
          );
          this.canAddFiles = true;
          this.canCreateArticle = true;
          this.getLibraries();
          this.getArticleData(idLibrary);
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
        }
      );

    }

  }

  /**
   * Add Document to files array when updating
   */
  addNewDocument() {
    if (this.validateUpdateModal()) {
      this.loading=true;
      this.newdoc=false;
      this.fileId++;
      try {
        let splitted = "";
        splitted = this.fileToUpload.name.split(".");
        let fileNamesplitted = "";
        for (let index = 0; index < splitted.length; index++) {
          if (index == (splitted.length - 1)) {
          }
          else if (index == (splitted.length - 2)) {
            fileNamesplitted += splitted[index];
          }
          else {
            fileNamesplitted += splitted[index] + ".";
          }

        }
        let splitArr2 = this.fileToUpload.type.split("/");
        let sizeInBytes: number = this.fileToUpload.size;

        //Object to show
        let obj = {
          "file": this.fileToUpload,
          "name": this.fileToUpload.name,
          "displayName": fileNamesplitted,
          "type": splitArr2[1],
          "size": sizeInBytes / 1000000,
          "titulo_EN": this.display_EN,
          "titulo_ES": this.display_ES,
          "titulo_FR": this.display_PT,
          "titulo_PT": this.display_FR,
          "id": this.fileId
        }
        this.myFiles = [];
        this.myFiles.push(obj);
        //SEND FILE 
        if (this.validateModal()) {
          let datos = new FormData();
          this.myFiles.forEach((element, index) => {
            datos.append(`archivo[${index}][idLibrary]`, this.idLibrary)
            datos.append(`archivo[${index}][file]`, element.file)
            datos.append(`archivo[${index}][name]`, element.name)
            datos.append(`archivo[${index}][displayName]`, element.displayName)
            datos.append(`archivo[${index}][type]`, element.type)
            datos.append(`archivo[${index}][size]`, element.size)
            datos.append(`archivo[${index}][titulo_EN]`, element.titulo_EN)
            datos.append(`archivo[${index}][titulo_ES]`, element.titulo_ES)
            datos.append(`archivo[${index}][titulo_FR]`, element.titulo_FR)
            datos.append(`archivo[${index}][titulo_PT]`, element.titulo_PT)
            datos.append(`archivo[${index}][id]`, element.id)
          });

          this.libraryService.postFile(datos).subscribe(
            (response: any) => {
              this.loading=false;
              this.newdoc=true;
              this.toastr.success(
                this.translate.instant('LIBRARY.FILE_SUCCESS'),
                this.translate.instant('LIBRARY.TITLE')
              );
              this.getUpdatedFilesById(this.idLibrary);
              this.getLibraries();
            },
            (error: any) => {
              this.loading=false;
              this.newdoc=true;
              this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
            }
          );
        }
        this.getLibraries();
        this.cancelDocument();
      } catch (error) {
      }


    }
  }

  /**
   * Validates if the form is valid
   * @returns True if the form is valid
   */
  validateUpdate() {
    let valid: number = 0;
    this.u_author = localStorage.getItem('auth-user') || "";
    this.u_author = this.u_author.replace("\"", ""); 
    this.u_author = this.u_author.replace("\"", ""); 
    //Title validations
    if (this.u_title_EN == "") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.EMPTYTITLE_EN'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.u_title_ES == "") {
      if (this.u_title_EN != "") {
        this.u_title_ES=this.u_title_EN;
      }
    }
    if (this.u_title_FR == "") {
      if (this.u_title_EN != "") {
        this.u_title_FR=this.u_title_EN;
      }
    }
    if (this.u_title_PT == "") {
      if (this.u_title_EN != "") {
        this.u_title_PT=this.u_title_EN;
      }
    }

    //Content validation
    if (this.u_htmlContentEN == "") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.HTMLCONTENT_EN'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if(this.u_htmlContentES ==""){
      if(this.u_htmlContentEN!=""){
        this.u_htmlContentES =this.u_htmlContentEN;       
      }
    }
    if(this.u_htmlContentFR ==""){
      if(this.u_htmlContentEN!=""){
        this.u_htmlContentFR =this.u_htmlContentEN;       
      }
    }
    if(this.u_htmlContentPT ==""){
      if(this.u_htmlContentEN !=""){
        this.u_htmlContentPT =this.u_htmlContentEN;       
      }
    }
    //DropDown validation
    if (this.u_priorityId == "-1") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.PRIORITY_V'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.u_countryName == "-1") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.COUNTRY_V'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }

    return true;
  }

  /**
   * Validates if the modal for adding new document is valid
   * @returns True if the form is valid
   */
  validateUpdateModal() {
    if (this.fileToUpload == File || this.fileToUpload==undefined) {
      this.toastr.warning(
        this.translate.instant('LIBRARY.FILE_V'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.display_EN == "") {
      this.toastr.warning(
        this.translate.instant('LIBRARY.EMPTYTITLE_EN'),
        this.translate.instant('LIBRARY.EMPTYTITLE')
      );
      return false;
    }
    if (this.display_ES == "") {
      if (this.display_EN != "") {
        this.display_ES=this.display_EN;
      }
    }
    if (this.display_FR == "") {
      if (this.display_EN != "") {
        this.display_FR=this.display_EN;
      }
    }
    if (this.display_PT == "") {
      if (this.display_EN != "") {
        this.display_PT=this.display_EN;
      }
    }

    if (this.fileToUpload) {
      let valid_file = 0;
      let sizeInBytes: number = this.fileToUpload.size;
      if (sizeInBytes == 0 || sizeInBytes > 5e+7) {
        this.toastr.warning(
          this.translate.instant('LIBRARY.FILES_SIZE_V'),
          this.translate.instant('LIBRARY.EMPTYTITLE')
        );
        valid_file++;
      }
      if (valid_file > 0) return false;
    }

    return true;
  }

  /**
     * Deletes file form array
     * @param idElement id for element to be deleted
     */
  deleteUpdatedDocument(idElement: string) {
    //Cargar data de un artículo
    this.libraryService.deleteFile(idElement).subscribe(
      (response: any) => {
        this.toastr.success(
          this.translate.instant('LIBRARY.DELETE_FILE_SUCCESS'),
          this.translate.instant('LIBRARY.TITLE')
        );
        this.getUpdatedFilesById(this.idLibrary);
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('LIBRARY.TITLE'));
      }
    );
  }



}
