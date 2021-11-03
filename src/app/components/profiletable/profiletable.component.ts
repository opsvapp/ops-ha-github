//Maneja la tabla de perfiles
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfilesService } from '../../services/profiles.service';
import { ValidateService } from '../../services/validate.service';
import { FunctionsService } from '../../services/functions.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { Subscription } from 'rxjs';
import { EmittersService } from '../../services/emitters/emitters.service';
import { TranslateService } from '@ngx-translate/core';
/**
 * Table where the users will be able to see, create, update or delete the profiles
 */
@Component({
  selector: 'app-profiletable',
  templateUrl: './profiletable.component.html',
  styleUrls: ['./profiletable.component.css'],
})
export class ProfiletableComponent implements OnInit, OnDestroy {
  /**
   * Subscription to changes on the table
   */
  dataChange: Subscription | undefined;
  /**
   * Table data
   */
  listaResultados: any = [];

  //Binding
  /**
   * Id of the selected profile
   */
  actualId: number = -1;
  /**
   * name of the selected profile
   */
  name: string = '';
  /**
   * description of the selected profile
   */
  description: string = '';
  /**
   * state of the selected profile
   */
  state: boolean = true;

  //Permisos
  /**
    * Permission used to let the user Review
   */
  canReview = false;
  /**
     * Permission used to let the user Update
    */
  canUpdate = false;
  /**
     * Permission used to let the user Delete
    */
  canDelete = false;

  /**
   * Lista de funciones 
   */
  functionList: Array<Number> = [];

  //CheckBoxes ngModels
  /**
   * userView checkbox
   */
  userView = false;
  /**
   * userCreate checkbox
   */
  userCreate = false;
  /**
   * userUpdate checkbox
   */
  userUpdate = false;
  /**
   * userDelete checkbox
   */
  userDelete = false;

  /**
   * profileView checkbox
   */
  profileView = false;
  /**
   * profileCreate checkbox
   */
  profileCreate = false;
  /**
   * profileUpdate checkbox
   */
  profileUpdate = false;
  /**
   * profileDelete checkbox
   */
  profileDelete = false;

  /**
   * logView checkbox
   */
  logView = false;

  /**
   * appView checkbox
   */
  appView = false;

  /**
   * newsView checkbox
   */
  newsView = false;
  /**
   * newsCreate checkbox
   */
  newsCreate = false;
  /**
   * newsUpdate checkbox
   */
  newsUpdate = false;
  /**
   * newsDelete checkbox
   */
  newsDelete = false;

  /**
   * vaccineView checkbox
   */
  vaccineView = false;
  /**
   * vaccineCreate checkbox
   */
  vaccineCreate = false;
  /**
   * vaccineUpdate checkbox
   */
  vaccineUpdate = false;
  /**
   * vaccineDelete checkbox
   */
  vaccineDelete = false;

  /**
   * diseaseView checkbox
   */
  diseaseView = false;
  /**
   * diseaseCreate checkbox
   */
  diseaseCreate = false;
  /**
   * diseaseUpdate checkbox
   */
  diseaseUpdate = false;
  /**
   * diseaseDelete checkbox
   */
  diseaseDelete = false;

  /**
   * effectsView checkbox
   */
  effectsView = false;
  /**
   * effectsCreate checkbox
   */
  effectsCreate = false;
  /**
   * effectsUpdate checkbox
   */
  effectsUpdate = false;
  /**
   * effectsDelete checkbox
   */
  effectsDelete = false;

  /**
   * countryView checkbox
   */
  countryView = false;
  /**
   * countryCreate checkbox
   */
  countryCreate = false;
  /**
   * countryUpdate checkbox
   */
  countryUpdate = false;
  /**
   * countryDelete checkbox
   */
  countryDelete = false;

  /**
   * schemeView checkbox
   */
  schemeView = false;
  /**
   * schemeCreate checkbox
   */
  schemeCreate = false;
  /**
   * schemeUpdate checkbox
   */
  schemeUpdate = false;
  /**
   * schemeDelete checkbox
   */
  schemeDelete = false;

  /**
   * travelView checkbox
   */
  travelView = false;
  /**
   * travelCreate checkbox
   */
  travelCreate = false;
  /**
   * travelUpdate checkbox
   */
  travelUpdate = false;
  /**
   * travelDelete checkbox
   */
  travelDelete = false;

  /**
   * vaccineCountryView checkbox
   */
  vaccineCountryView = false;
  /**
   * vaccineCountryCreate checkbox
   */
  vaccineCountryCreate = false;
  /**
   * vaccineCountryUpdate checkbox
   */
  vaccineCountryUpdate = false;
  /**
   * vaccineCountryDelete checkbox
   */
  vaccineCountryDelete = false;

  /**
   * adminOneView checkbox
   */
  adminOneView = false;
  /**
   * adminOneCreate checkbox
   */
  adminOneCreate = false;
  /**
   * adminOneUpdate checkbox
   */
  adminOneUpdate = false;
  /**
   * adminOneDelete checkbox
   */
  adminOneDelete = false;

  /**
   * adminTwoView checkbox
   */
  adminTwoView = false;
  /**
   * adminTwoCreate checkbox
   */
  adminTwoCreate = false;
  /**
   * adminTwoUpdate checkbox
   */
  adminTwoUpdate = false;
  /**
   * adminTwoDelete checkbox
   */
  adminTwoDelete = false;

  /**
   * healthCenterView checkbox
   */
  healthCenterView = false;
  /**
   * healthCenterCreate checkbox
   */
  healthCenterCreate = false;
  /**
   * healthCenterUpdate checkbox
   */
  healthCenterUpdate = false;
  /**
   * healthCenterDelete checkbox
   */
  healthCenterDelete = false;

  /**
   * vaccineCenterView checkbox
   */
  vaccineCenterView = false;
  /**
   * vaccineCenterCreate checkbox
   */
  vaccineCenterCreate = false;
  /**
   * vaccineCenterUpdate checkbox
   */
  vaccineCenterUpdate = false;
  /**
   * vaccineCenterDelete checkbox
   */
  vaccineCenterDelete = false;

  /**
   * vpointCenterView checkbox
   */
  vpointCenterView = false;
  /**
   * vpointCenterCreate checkbox
   */
  vpointCenterCreate = false;
  /**
   * vpointCenterUpdate checkbox
   */
  vpointCenterUpdate = false;
  /**
   * vpointCenterDelete checkbox
   */
  vpointCenterDelete = false;

  /**
   * uploadFiles checkbox
   */
  uploadFiles = false;

  /**
   * Construcor for ProfiletableComponent
   * @param profilesService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param validateService Service that validates if strings are correct
   * @param permitsService Service used for filtering info according to the user permissions
   * @param functionsService Service used to see user functions
   * @param translate Service used for traslating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private profilesService: ProfilesService,
    private toastr: ToastrService,
    private validateService: ValidateService,
    private permitsService: PermitsService,
    private functionsService: FunctionsService,
    private translate: TranslateService,
    private emitterService: EmittersService
  ) {}

  /**
   * Charge the initial table of profiles 
   */
  ngOnInit(): void {
    this.dataChange = this.emitterService
      .getPerfilChangeEmitter()
      .subscribe(() => {
        this.getProfiles();
      });

    this.getProfiles();

    //Permisos
    this.canUpdate = this.permitsService.validate(Functions.PROFILE_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.PROFILE_DELETE);
    this.canReview = this.permitsService.validate(Functions.PROFILE_REVIEW);
  }

  /**
   * Unsubscribes from data changes
   */
  ngOnDestroy(): void {
    this.dataChange?.unsubscribe();
  }

  /**
   * Request the profiles to the backend
   */
  getProfiles() {
    this.profilesService.getProfiles().subscribe((datos: any) => {
      if (datos.statusCode == 200) {
        this.listaResultados = datos.data;
      } else {
        this.listaResultados = [];
        this.toastr.warning(
          this.translate.instant('PROFILETABLE.NOPROFILES'),
          this.translate.instant('PROFILETABLE.PROFILES')
        );
      }
    });
  }

  /**
   * Send the selected functions to the backend
   */
  setProfileFunctions() {
    this.functionList = [];

    //Checkboxes
    this.userView ? this.functionList.push(Functions.USER_REVIEW) : void 0;
    this.userCreate ? this.functionList.push(Functions.USER_CREATE) : void 0;
    this.userUpdate ? this.functionList.push(Functions.USER_UPDATE) : void 0;
    this.userDelete ? this.functionList.push(Functions.USER_DELETE) : void 0;

    this.profileView
      ? this.functionList.push(Functions.PROFILE_REVIEW)
      : void 0;
    this.profileCreate
      ? this.functionList.push(Functions.PROFILE_CREATE)
      : void 0;
    this.profileUpdate
      ? this.functionList.push(Functions.PROFILE_UPDATE)
      : void 0;
    this.profileDelete
      ? this.functionList.push(Functions.PROFILE_DELETE)
      : void 0;

    this.logView ? this.functionList.push(Functions.LOG_REVIEW) : void 0;

    this.appView ? this.functionList.push(Functions.APP_REVIEW) : void 0;

    this.newsView ? this.functionList.push(Functions.NEWS_REVIEW) : void 0;
    this.newsCreate ? this.functionList.push(Functions.NEWS_CREATE) : void 0;
    this.newsUpdate ? this.functionList.push(Functions.NEWS_UPDATE) : void 0;
    this.newsDelete ? this.functionList.push(Functions.NEWS_DELETE) : void 0;

    this.vaccineView
      ? this.functionList.push(Functions.VACCINE_REVIEW)
      : void 0;
    this.vaccineCreate
      ? this.functionList.push(Functions.VACCINE_CREATE)
      : void 0;
    this.vaccineUpdate
      ? this.functionList.push(Functions.VACCINE_UPDATE)
      : void 0;
    this.vaccineDelete
      ? this.functionList.push(Functions.VACCINE_DELETE)
      : void 0;

    this.diseaseView
      ? this.functionList.push(Functions.DISEASE_REVIEW)
      : void 0;
    this.diseaseCreate
      ? this.functionList.push(Functions.DISEASE_CREATE)
      : void 0;
    this.diseaseUpdate
      ? this.functionList.push(Functions.DISEASE_UPDATE)
      : void 0;
    this.diseaseDelete
      ? this.functionList.push(Functions.DISEASE_DELETE)
      : void 0;

    this.effectsView
      ? this.functionList.push(Functions.EFFECTS_REVIEW)
      : void 0;
    this.effectsCreate
      ? this.functionList.push(Functions.EFFECTS_CREATE)
      : void 0;
    this.effectsUpdate
      ? this.functionList.push(Functions.EFFECTS_UPDATE)
      : void 0;
    this.effectsDelete
      ? this.functionList.push(Functions.EFFECTS_DELETE)
      : void 0;

    this.countryView
      ? this.functionList.push(Functions.COUNTRY_REVIEW)
      : void 0;
    this.countryCreate
      ? this.functionList.push(Functions.COUNTRY_CREATE)
      : void 0;
    this.countryUpdate
      ? this.functionList.push(Functions.COUNTRY_UPDATE)
      : void 0;
    this.countryDelete
      ? this.functionList.push(Functions.COUNTRY_DELETE)
      : void 0;

    this.schemeView ? this.functionList.push(Functions.SCHEME_REVIEW) : void 0;
    this.schemeCreate
      ? this.functionList.push(Functions.SCHEME_CREATE)
      : void 0;
    this.schemeUpdate
      ? this.functionList.push(Functions.SCHEME_UPDATE)
      : void 0;
    this.schemeDelete
      ? this.functionList.push(Functions.SCHEME_DELETE)
      : void 0;

    this.travelView ? this.functionList.push(Functions.TRAVEL_REVIEW) : void 0;
    this.travelCreate
      ? this.functionList.push(Functions.TRAVEL_CREATE)
      : void 0;
    this.travelUpdate
      ? this.functionList.push(Functions.TRAVEL_UPDATE)
      : void 0;
    this.travelDelete
      ? this.functionList.push(Functions.TRAVEL_DELETE)
      : void 0;

    this.vaccineCountryView
      ? this.functionList.push(Functions.VCOUNTRY_REVIEW)
      : void 0;
    this.vaccineCountryCreate
      ? this.functionList.push(Functions.VCOUNTRY_CREATE)
      : void 0;
    this.vaccineCountryUpdate
      ? this.functionList.push(Functions.VCOUNTRY_UPDATE)
      : void 0;
    this.vaccineCountryDelete
      ? this.functionList.push(Functions.VCOUNTRY_DELETE)
      : void 0;

    this.adminOneView
      ? this.functionList.push(Functions.ADMIN1_REVIEW)
      : void 0;
    this.adminOneCreate
      ? this.functionList.push(Functions.ADMIN1_CREATE)
      : void 0;
    this.adminOneUpdate
      ? this.functionList.push(Functions.ADMIN1_UPDATE)
      : void 0;
    this.adminOneDelete
      ? this.functionList.push(Functions.ADMIN1_DELETE)
      : void 0;

    this.adminTwoView
      ? this.functionList.push(Functions.ADMIN2_REVIEW)
      : void 0;
    this.adminTwoCreate
      ? this.functionList.push(Functions.ADMIN2_CREATE)
      : void 0;
    this.adminTwoUpdate
      ? this.functionList.push(Functions.ADMIN2_UPDATE)
      : void 0;
    this.adminTwoDelete
      ? this.functionList.push(Functions.ADMIN2_DELETE)
      : void 0;

    this.healthCenterView
      ? this.functionList.push(Functions.HCENTER_REVIEW)
      : void 0;
    this.healthCenterCreate
      ? this.functionList.push(Functions.HCENTER_CREATE)
      : void 0;
    this.healthCenterUpdate
      ? this.functionList.push(Functions.HCENTER_UPDATE)
      : void 0;
    this.healthCenterDelete
      ? this.functionList.push(Functions.HCENTER_DELETE)
      : void 0;

    this.vaccineCenterView
      ? this.functionList.push(Functions.VCENTER_REVIEW)
      : void 0;
    this.vaccineCenterCreate
      ? this.functionList.push(Functions.VCENTER_CREATE)
      : void 0;
    this.vaccineCenterUpdate
      ? this.functionList.push(Functions.VCENTER_UPDATE)
      : void 0;
    this.vaccineCenterDelete
      ? this.functionList.push(Functions.VCENTER_DELETE)
      : void 0;

      this.vpointCenterView
      ? this.functionList.push(Functions.VPOINT_REVIEW)
      : void 0;
    this.vpointCenterCreate
      ? this.functionList.push(Functions.VPOINT_CREATE)
      : void 0;
    this.vpointCenterUpdate
      ? this.functionList.push(Functions.VPOINT_UPDATE)
      : void 0;
    this.vpointCenterDelete
      ? this.functionList.push(Functions.VPOINT_DELETE)
      : void 0;

    this.uploadFiles ? this.functionList.push(Functions.UPLOAD) : void 0;

    //Peticion
    let dato = { id: this.actualId, functions: this.functionList };
    console.log(dato);
    this.functionsService.setFunctions(dato).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant('PROFILETABLE.FUNCTIONADDED'),
            this.translate.instant('PROFILETABLE.FUNCTIONS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(
          error,
          this.translate.instant('PROFILETABLE.FUNCTIONS')
        );
      }
    );
  }

  /**
   * Delets a profile
   * @param id Id of the profile to delete
   */
  deleteProfile(id: number) {
    if (confirm(this.translate.instant('PROFILETABLE.CONFIRMPROFILEDELETE'))) {
      this.profilesService.deleteProfile(id).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            this.ngOnInit();
            this.toastr.success(
              this.translate.instant('PROFILETABLE.PROFILEDELETED'),
              this.translate.instant('PROFILETABLE.PROFILES')
            );
          }
        },
        (error) => {
          this.toastr.error(
            error,
            this.translate.instant('PROFILETABLE.PROFILES')
          );
        }
      );
    }
  }

  /**
   * Preload profile data
   * @param id ID of the profile to laod
   */
  setProfileId(id: number) {
    this.actualId = id;
    this.profilesService.getProfile(id).subscribe((response: any) => {
      if (response.statusCode == 200) {
        this.name = response.data.name;
        this.description = response.data.description;
        this.state = response.data.active;
      } else {
        this.name = this.translate.instant('PROFILETABLE.NONAME');
        this.description = this.translate.instant('PROFILETABLE.NODESC');
        this.state = false;
      }
    });
  }

  /**
   * Sets funtions to a profile
   * @param id ID of the profile to update
   */
  setProfileFunctionsId(id: number) {
    this.actualId = id;
    this.functionsService.getFunctions(this.actualId).subscribe(
      (response: any) => {
        if (response.data.length > 0) {
            let permits: Array<number> = response.data;
            this.setCheckBoxes(permits);
        } else {
          this.toastr.warning(
            this.translate.instant('PROFILETABLE.NOFUNCTIONS'),
            this.translate.instant('PROFILETABLE.FUNCTIONS')
          );
          this.clearChecks();
        }
      },
      (error) => {
        this.toastr.error(
          error,
          this.translate.instant('PROFILETABLE.FUNCTIONS')
        );
        this.clearChecks();
      }
    );
  }

  /**
   *  Set checkboxes marks
   */
  private setCheckBoxes(permits: number[]) {
    this.userView = permits.includes(Functions.USER_REVIEW) ? true : false;
    this.userCreate = permits.includes(Functions.USER_CREATE) ? true : false;
    this.userUpdate = permits.includes(Functions.USER_UPDATE) ? true : false;
    this.userDelete = permits.includes(Functions.USER_DELETE) ? true : false;
    //Perfiles
    this.profileView = permits.includes(Functions.PROFILE_REVIEW)
      ? true
      : false;
    this.profileCreate = permits.includes(Functions.PROFILE_CREATE)
      ? true
      : false;
    this.profileUpdate = permits.includes(Functions.PROFILE_UPDATE)
      ? true
      : false;
    this.profileDelete = permits.includes(Functions.PROFILE_DELETE)
      ? true
      : false;
    //Bitacora
    this.logView = permits.includes(Functions.LOG_REVIEW) ? true : false;
    //App
    this.appView = permits.includes(Functions.APP_REVIEW) ? true : false;
    //Noticias
    this.newsView = permits.includes(Functions.NEWS_REVIEW) ? true : false;
    this.newsCreate = permits.includes(Functions.NEWS_CREATE) ? true : false;
    this.newsUpdate = permits.includes(Functions.NEWS_UPDATE) ? true : false;
    this.newsDelete = permits.includes(Functions.NEWS_DELETE) ? true : false;
    //Vacunas
    this.vaccineView = permits.includes(Functions.VACCINE_REVIEW)
      ? true
      : false;
    this.vaccineCreate = permits.includes(Functions.VACCINE_CREATE)
      ? true
      : false;
    this.vaccineUpdate = permits.includes(Functions.VACCINE_UPDATE)
      ? true
      : false;
    this.vaccineDelete = permits.includes(Functions.VACCINE_DELETE)
      ? true
      : false;
    //Enfermedades
    this.diseaseView = permits.includes(Functions.DISEASE_REVIEW)
      ? true
      : false;
    this.diseaseCreate = permits.includes(Functions.DISEASE_CREATE)
      ? true
      : false;
    this.diseaseUpdate = permits.includes(Functions.DISEASE_UPDATE)
      ? true
      : false;
    this.diseaseDelete = permits.includes(Functions.DISEASE_DELETE)
      ? true
      : false;
    //Efectos
    this.effectsView = permits.includes(Functions.EFFECTS_REVIEW)
      ? true
      : false;
    this.effectsCreate = permits.includes(Functions.EFFECTS_CREATE)
      ? true
      : false;
    this.effectsUpdate = permits.includes(Functions.EFFECTS_UPDATE)
      ? true
      : false;
    this.effectsDelete = permits.includes(Functions.EFFECTS_DELETE)
      ? true
      : false;
    //Pais
    this.countryView = permits.includes(Functions.COUNTRY_REVIEW)
      ? true
      : false;
    this.countryCreate = permits.includes(Functions.COUNTRY_CREATE)
      ? true
      : false;
    this.countryUpdate = permits.includes(Functions.COUNTRY_UPDATE)
      ? true
      : false;
    this.countryDelete = permits.includes(Functions.COUNTRY_DELETE)
      ? true
      : false;
    //Esquema
    this.schemeView = permits.includes(Functions.SCHEME_REVIEW) ? true : false;
    this.schemeCreate = permits.includes(Functions.SCHEME_CREATE)
      ? true
      : false;
    this.schemeUpdate = permits.includes(Functions.SCHEME_UPDATE)
      ? true
      : false;
    this.schemeDelete = permits.includes(Functions.SCHEME_DELETE)
      ? true
      : false;
    //Travel
    this.travelView = permits.includes(Functions.TRAVEL_REVIEW) ? true : false;
    this.travelCreate = permits.includes(Functions.TRAVEL_CREATE)
      ? true
      : false;
    this.travelUpdate = permits.includes(Functions.TRAVEL_UPDATE)
      ? true
      : false;
    this.travelDelete = permits.includes(Functions.TRAVEL_DELETE)
      ? true
      : false;

    //Vaccine_Country
    this.vaccineCountryView = permits.includes(Functions.VCOUNTRY_REVIEW)
      ? true
      : false;
    this.vaccineCountryCreate = permits.includes(Functions.VCOUNTRY_CREATE)
      ? true
      : false;
    this.vaccineCountryUpdate = permits.includes(Functions.VCOUNTRY_UPDATE)
      ? true
      : false;
    this.vaccineCountryDelete = permits.includes(Functions.VCOUNTRY_DELETE)
      ? true
      : false;

    //Admin1
    this.adminOneView = permits.includes(Functions.ADMIN1_REVIEW)
      ? true
      : false;
    this.adminOneCreate = permits.includes(Functions.ADMIN1_CREATE)
      ? true
      : false;
    this.adminOneUpdate = permits.includes(Functions.ADMIN1_UPDATE)
      ? true
      : false;
    this.adminOneDelete = permits.includes(Functions.ADMIN1_DELETE)
      ? true
      : false;

    //Admin2
    this.adminTwoView = permits.includes(Functions.ADMIN2_REVIEW)
      ? true
      : false;
    this.adminTwoCreate = permits.includes(Functions.ADMIN2_CREATE)
      ? true
      : false;
    this.adminTwoUpdate = permits.includes(Functions.ADMIN2_UPDATE)
      ? true
      : false;
    this.adminTwoDelete = permits.includes(Functions.ADMIN2_DELETE)
      ? true
      : false;

    //Health Center
    this.healthCenterView = permits.includes(Functions.HCENTER_REVIEW)
      ? true
      : false;
    this.healthCenterCreate = permits.includes(Functions.HCENTER_CREATE)
      ? true
      : false;
    this.healthCenterUpdate = permits.includes(Functions.HCENTER_UPDATE)
      ? true
      : false;
    this.healthCenterDelete = permits.includes(Functions.HCENTER_DELETE)
      ? true
      : false;

  //Vaccine Center
    this.vaccineCenterView = permits.includes(Functions.VCENTER_REVIEW)
    ? true
    : false;
  this.vaccineCenterCreate = permits.includes(Functions.VCENTER_CREATE)
    ? true
    : false;
  this.vaccineCenterUpdate = permits.includes(Functions.VCENTER_UPDATE)
    ? true
    : false;
  this.vaccineCenterDelete = permits.includes(Functions.VCENTER_DELETE)
    ? true
    : false;
  //Vaccination Point
  this.vpointCenterView = permits.includes(Functions.VPOINT_REVIEW)
  ? true
  : false;
this.vpointCenterCreate = permits.includes(Functions.VPOINT_CREATE)
  ? true
  : false;
this.vpointCenterUpdate = permits.includes(Functions.VPOINT_UPDATE)
  ? true
  : false;
this.vpointCenterDelete = permits.includes(Functions.VPOINT_DELETE)
  ? true
  : false;

    this.uploadFiles = permits.includes(Functions.UPLOAD) ? true : false;
  }

  /**
   * Remove checkboxes marks.
   */
  private clearChecks() {
    //Usuarios
    this.userView = false;
    this.userCreate = false;
    this.userUpdate = false;
    this.userDelete = false;
    //Perfiles
    this.profileView = false;
    this.profileCreate = false;
    this.profileUpdate = false;
    this.profileDelete = false;
    //Bitacora
    this.logView = false;
    //App
    this.appView = false;
    //Noticias
    this.newsView = false;
    this.newsCreate = false;
    this.newsUpdate = false;
    this.newsDelete = false;
    //Vacunas
    this.vaccineView = false;
    this.vaccineCreate = false;
    this.vaccineUpdate = false;
    this.vaccineDelete = false;
    //Enfermedades
    this.diseaseView = false;
    this.diseaseCreate = false;
    this.diseaseUpdate = false;
    this.diseaseDelete = false;
    //Efectos
    this.effectsView = false;
    this.effectsCreate = false;
    this.effectsUpdate = false;
    this.effectsDelete = false;
    //Paises
    this.countryView = false;
    this.countryCreate = false;
    this.countryUpdate = false;
    this.countryDelete = false;
    //Esquema
    this.schemeView = false;
    this.schemeCreate = false;
    this.schemeUpdate = false;
    this.schemeDelete = false;
    //Travel
    this.travelView = false;
    this.travelCreate = false;
    this.travelUpdate = false;
    this.travelDelete = false;
    //Vaccine_country
    this.vaccineCountryView = false;
    this.vaccineCountryCreate = false;
    this.vaccineCountryUpdate = false;
    this.vaccineCountryDelete = false;
    //Admin_1
    this.adminOneView = false;
    this.adminOneCreate = false;
    this.adminOneUpdate = false;
    this.adminOneDelete = false;
    //Admin_2
    this.adminTwoView = false;
    this.adminTwoCreate = false;
    this.adminTwoUpdate = false;
    this.adminTwoDelete = false;
    //Health Center
    this.healthCenterView = false;
    this.healthCenterCreate = false;
    this.healthCenterUpdate = false;
    this.healthCenterDelete = false;
    //Vaccine Center
    this.vaccineCenterView = false;
    this.vaccineCenterCreate = false;
    this.vaccineCenterUpdate = false;
    this.vaccineCenterDelete = false;
    //Vaccine Center
    this.vpointCenterView = false;
    this.vpointCenterCreate = false;
    this.vpointCenterUpdate = false;
    this.vpointCenterDelete = false;
    //UPLOAD
    this.uploadFiles = false;
  }

  /**
   * Updates the profile functions. 
   */
  updateProfile() {
    //Recolecta los datos si existen
    let info: any = {};
    info['id'] = this.actualId;
    this.name.trim().length > 0 ? (info['name'] = this.name) : void 0;
    this.description.trim().length > 0
      ? (info['description'] = this.description)
      : void 0;
    info['active'] = this.state;
    //Realizar request para actualizar
    if (this.validarDatos()) {
      this.profilesService.updateProfile(info).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant('PROFILETABLE.PROFILEUPDATED'),
              this.translate.instant('PROFILETABLE.PROFILES')
            );
            this.ngOnInit();
            this.name = '';
            this.description = '';
            this.state = true;
          }
        },
        (error) => {
          this.toastr.error(
            error,
            this.translate.instant('PROFILETABLE.PROFILES')
          );
        }
      );
    }
  }

  /**
    * Validates the data of the modal, if the 2 validations pass then it is valid
    */
  validarDatos() {
    let total: number = 0;
    if (this.validateService.validarTitulos(this.name)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('PROFILETABLE.INVALIDNAME'),
        this.translate.instant('PROFILETABLE.VALIDATION')
      );
    }
    if (this.description.trim().length > 0) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('PROFILETABLE.INVALIDDESC'),
        this.translate.instant('PROFILETABLE.VALIDATION')
      );
    }
    return total === 2 ? true : false;
  }
}
