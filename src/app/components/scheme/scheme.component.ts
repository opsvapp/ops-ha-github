import { Component, OnDestroy, OnInit } from '@angular/core';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
//Servicio de Esquemas
import { SchemesService } from '../../services/schemes.service';
//Toastr
import { ToastrService } from 'ngx-toastr';
//Translate
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

/**
 * Table where the users will be able to see, create, update or delete schemes
 */
@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css'],
})
export class SchemeComponent implements OnInit, OnDestroy {
  //ngModel
  /**
   * ngModel for initialYear
   */
  initialYear = '';
  /**
   * ngModel for finalYear
   */
  finalYear = '';
  /**
   * ngModel for nameEN
   */
  nameEN = '';
  /**
   * ngModel for nameES
   */
  nameES = '';
  /**
   * ngModel for namePT
   */
  namePT = '';
  /**
   * ngModel for nameFR
   */
  nameFR = '';
  /**
   * ngModel for descriptionEN
   */
  descriptionEN = '';
  /**
   * ngModel for descriptionES
   */
  descriptionES = '';
  /**
   * ngModel for descriptionPT
   */
  descriptionPT = '';
  /**
   * ngModel for descriptionFR
   */
  descriptionFR = '';
  /**
   * ngModel for listMode
   */
  listMode = '0';

  //Modal ngModels
  /**
   * Modal ngModel for modalNameEN 
   */
  modalNameEN = '';
  /**
   * Modal ngModel for modalNameES 
   */
  modalNameES = '';
  /**
   * Modal ngModel for modalNamePT 
   */
  modalNamePT = '';
  /**
   * Modal ngModel for modalNameFR 
   */
  modalNameFR = '';

  /**
   * Modal ngModel for modalDescriptionEN 
   */
  modalDescriptionEN = '';
  /**
   * Modal ngModel for modalDescriptionES 
   */
  modalDescriptionES = '';
  /**
   * Modal ngModel for modalDescriptionPT 
   */
  modalDescriptionPT = '';
  /**
   * Modal ngModel for modalDescriptionFR 
   */
  modalDescriptionFR = '';

  /**
   * Modal ngModel for modalInitialYear 
   */
  modalInitialYear = '';
  /**
   * Modal ngModel for modalFinalYear 
   */
  modalFinalYear = '';
  /**
   * Modal ngModel for modalListMode 
   */
  modalListMode = 'false';

  //Var
  /**
   * List of shemes
   */
  schemeList: Array<any> = [];
  /**
   * ID of the selected scheme
   */
  schemeid: string = '';

  //Permisos
  /**
    * Permission used to let the user Review
   */
  canReview = false;
  /**
     * Permission used to let the user Create
    */
  canCreate = false;
  /**
     * Permission used to let the user Update
    */
  canUpdate = false;
  /**
     * Permission used to let the user Delete
    */
  canDelete = false;

  /**
     * Language used in the app
    */
  lang: string = "en";
  /**
     * subscribes to language changes
     */
  langChange: Subscription | undefined;

  /**
   * Contructor for SchemeComponent
   * @param permitsService Service used for filtering info according to the user permissions
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param schemeService Service used to make requests to the backend
   * @param translate Service used for traslating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private permitsService: PermitsService,
    private toastr: ToastrService,
    private schemeService: SchemesService,
    private translate: TranslateService,
    private emitterService: EmittersService
    ) {}

  /**
   * Loads the list of existing schemes
   */
  ngOnInit(): void {
    this.listMode='false';
    this.schemeService.getSchemes().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.schemeList = response.data;
          if (this.schemeList.length == 0) {
            this.toastr.warning(
              this.translate.instant("SCHEME.NOSCHEMES"),
              this.translate.instant("SCHEME.MANAGEMENT")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("SCHEME.MANAGEMENT"));
      }
    );
    this.canReview = this.permitsService.validate(Functions.SCHEME_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.SCHEME_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.SCHEME_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.SCHEME_DELETE);

    this.lang = localStorage.getItem("lang") || "en";

    this.langChange = this.emitterService
      .getLangChangeEmitter()
      .subscribe((value: string) =>{
        this.lang = value;
      });
  }

  /**
   * Unsubscribe from language changes
   */
  ngOnDestroy(): void {
    this.langChange?.unsubscribe();
  }

  /**
   * Request to save a new scheme
   */
  saveScheme() {
    if (this.validar()) {
      let datos = new FormData();
      datos.append('name_EN', this.nameEN);
      datos.append('description_EN', this.descriptionEN);
      datos.append('name_ES', this.nameES);
      datos.append('description_ES', this.descriptionES);
      datos.append('name_PT', this.namePT);
      datos.append('description_PT', this.descriptionPT);
      datos.append('name_FR', this.nameFR);
      datos.append('description_FR', this.descriptionFR);
      datos.append('initialYear', this.initialYear);
      datos.append('finalYear', this.finalYear);
      datos.append('listMode', this.listMode);
      //Request
      this.schemeService.createScheme(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant("SCHEME.SCHEMESAVED"), 
            this.translate.instant("SCHEME.MANAGEMENT")
          );
          this.clear();
          this.ngOnInit();
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("SCHEME.MANAGEMENT"));
        }
      );
    }
  }

  /**
   * toggles the list mode of the scheme
   */
  setListMode() {
    this.listMode == 'true' ? (this.listMode = 'false') : (this.listMode = 'true');
  }

  /**
   * Return the value fof modalListMode
   */
  setModalCheck(){
    return this.modalListMode == 'true'? true:false;
  }

  /**
   * toggles the ModalListMode
   */
  setModalListMode(){
    this.modalListMode == 'true' ? (this.modalListMode = 'false') : (this.modalListMode = 'true');
  }

  /**
   * Sets the scheme data that will be modified to the form
   * @param id ID of the scheme that will be worked
   */
  setSchemeId(id: string) {
    this.schemeid = id;
    this.schemeService.getScheme(id).subscribe(
      (response: any) => {
        let datos = response.data;
        this.modalNameEN = datos.name_EN;
        this.modalNameES = datos.name_ES;
        this.modalNamePT = datos.name_PT;
        this.modalNameFR = datos.name_FR;
        this.modalDescriptionEN = datos.description_EN;
        this.modalDescriptionES = datos.description_ES;
        this.modalDescriptionPT = datos.description_PT;
        this.modalDescriptionFR = datos.description_FR;
        this.modalInitialYear = datos.initialYear;
        this.modalFinalYear = datos.finalYear;
        this.modalListMode = datos.listMode==1?'true':'false';
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("SCHEME.MANAGEMENT"));
      }
    );
  }

  /**
   * Sends a request to the backend to update the scheme
   */
  updateScheme() {
    let datos = new FormData();
    datos.append('idScheme', this.schemeid);
    datos.append('name_EN', this.modalNameEN);
    datos.append('description_EN', this.modalDescriptionEN);
    datos.append('name_ES', this.modalNameES);
    datos.append('description_ES', this.modalDescriptionES);
    datos.append('name_PT', this.modalNamePT);
    datos.append('description_PT', this.modalDescriptionPT);
    datos.append('name_FR', this.modalNameFR);
    datos.append('description_FR', this.modalDescriptionFR);
    datos.append('initialYear', this.modalInitialYear);
    datos.append('finalYear', this.modalFinalYear);
    datos.append('listMode', this.modalListMode);
    this.schemeService.updateScheme(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("SCHEME.SCHEMEUPDATED"), 
            this.translate.instant("SCHEME.MANAGEMENT")
          );
          this.ngOnInit();
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("SCHEME.MANAGEMENT"));
      }
    );
  }

  /**
   * Sends a request to the backend to delete a scheme
   * @param id ID of the scheme that will be deleted
   */
  deleteScheme(id: string) {
    if (confirm(this.translate.instant("SCHEME.CONFIRMDELETE"))) {
      this.schemeService.removeScheme(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("SCHEME.SCHEMEDELETED"),
              this.translate.instant("SCHEME.MANAGEMENT")
            );
            this.ngOnInit();
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("SCHEME.MANAGEMENT"));
        }
      );
    }
  }

  /**
   * Validates the data of the form
   * @returns True if the data is valid
   */
  validar(): boolean {
    let val: number = 0;
    if (this.nameEN.trim().length > 0 && this.descriptionEN.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("SCHEME.CHECKENGLISH"),
        this.translate.instant("SCHEME.VALIDATION")
      );
    }

    if (this.nameES.trim().length > 0 && this.descriptionES.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("SCHEME.CHECKSPANISH"),
        this.translate.instant("SCHEME.VALIDATION")
      );
    }

    if (this.namePT.trim().length > 0 && this.descriptionPT.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("SCHEME.CHECKPORTUGUESE"),
        this.translate.instant("SCHEME.VALIDATION")
      );
    }

    if (this.nameFR.trim().length > 0 && this.descriptionFR.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("SCHEME.CHECKFRENCH"),
        this.translate.instant("SCHEME.VALIDATION")
      );
    }

    if (0 <= parseInt(this.initialYear) && parseInt(this.initialYear) <= 1440) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("SCHEME.STARTAGEINVALID"),
        this.translate.instant("SCHEME.VALIDATION")
      );
    }

    if (0 <= parseInt(this.finalYear) && parseInt(this.finalYear) <= 1440) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("SCHEME.ENDAGEINVALID"),
        this.translate.instant("SCHEME.VALIDATION")
      );
    }

    if (parseInt(this.initialYear) < parseInt(this.finalYear)) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("SCHEME.AGESVALIDATION"),
        this.translate.instant("SCHEME.VALIDATION")
      );
    }

    return val === 7 ? true : false;
  }

  /**
   * Clears the data of the form
   */
  clear() {
    this.nameEN = '';
    this.nameES = '';
    this.namePT = '';
    this.nameFR = '';
    this.descriptionEN = '';
    this.descriptionES = '';
    this.descriptionPT = '';
    this.descriptionFR = '';
    this.initialYear = '';
    this.finalYear = '';
    this.listMode = 'false';
  }

  /**
   * Check if the actual scheme id is not restricted to manipulate
   * @returns True if the actual Scheme ID is free to manipulate.
   */
  restricted(){
    return (Number(this.schemeid)>2)?true:false;
  }
}
