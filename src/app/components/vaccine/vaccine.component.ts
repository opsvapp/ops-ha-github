import { Component, OnDestroy, OnInit } from '@angular/core';
//Services
import { VaccineService } from '../../services/vaccine.service';
import { DiseaseService } from '../../services/disease.service';
import { EffectsService } from '../../services/effects.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { CountryService } from 'src/app/services/country.service';
import { VaccineCountryService } from 'src/app/services/vaccine-country.service';

/**
 * Component where the user can create, delete, update and review vaccines
 */
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css'],
})
export class VaccineComponent implements OnInit, OnDestroy {
  //ngModels
  /**
   * ngModel for nameEN
   */
  nameEN = '';
  /**
   * ngModel for titleEN
   */
  titleEN = '';
  /**
   * ngModel for adminEN
   */
  adminEN = '';
  /**
   * ngModel for descriptionEN
   */
  descriptionEN = '';

  /**
   * ngModel for nameES
   */
  nameES = '';
  /**
   * ngModel for titleES
   */
  titleES = '';
  /**
   * ngModel for adminES
   */
  adminES = '';
  /**
   * ngModel for descriptionES
   */
  descriptionES = '';

  /**
   * ngModel for namePT
   */
  namePT = '';
  /**
   * ngModel for titlePT
   */
  titlePT = '';
  /**
   * ngModel for adminPT
   */
  adminPT = '';
  /**
   * ngModel for descriptionPT
   */
  descriptionPT = '';

  /**
   * ngModel for nameFR
   */
  nameFR = '';
  /**
   * ngModel for titleFR
   */
  titleFR = '';
  /**
   * ngModel for adminFR
   */
  adminFR = '';
  /**
   * ngModel for descriptionFR
   */
  descriptionFR = '';

  //Modal ngModels
  /**
   * modal ngModel for NameEN
   */
  modalNameEN = '';
  /**
   * modal ngModel for NameES
   */
  modalNameES = '';
  /**
   * modal ngModel for NamePT
   */
  modalNamePT = '';
  /**
   * modal ngModel for NameFR
   */
  modalNameFR = '';

  /**
   * modal ngModel for TitleEN
   */
  modalTitleEN = '';
  /**
   * modal ngModel for TitleES
   */
  modalTitleES = '';
  /**
   * modal ngModel for TitlePT
   */
  modalTitlePT = '';
  /**
   * modal ngModel for TitleFR
   */
  modalTitleFR = '';

  /**
   * modal ngModel for AdminEN
   */
  modalAdminEN = '';
  /**
   * modal ngModel for AdminES
   */
  modalAdminES = '';
  /**
   * modal ngModel for AdminPT
   */
  modalAdminPT = '';
  /**
   * modal ngModel for AdminFR
   */
  modalAdminFR = '';

  /**
   * modal ngModel for DescriptionEN
   */
  modalDescriptionEN = '';
  /**
   * modal ngModel for DescriptionES
   */
  modalDescriptionES = '';
  /**
   * modal ngModel for DescriptionPT
   */
  modalDescriptionPT = '';
  /**
   * modal ngModel for DescriptionFR
   */
  modalDescriptionFR = '';

  //Array para manejar la creacion de vacuna
  /**
   * List of modalDisease
   */
  modalDiseaseList: Array<any> = [];
  /**
   * List of modalEffect
   */
  modalEffectList: Array<any> = [];

  //Array para manejar la actualizacion
  /**
   * List of updatedDisease
   */
  updatedDiseaseList: Array<any> = [];
  /**
   * List of updatedEffect
   */
  updatedEffectList: Array<any> = [];

  /**
   * List of updatedEffect
   */
   updatedCountryList: Array<any> = [];

  //Array con los listados disponibles
  /**
   * List of disease
   */
  diseaseList: Array<any> = [];
  /**
   * List of effects
   */
  effectsList: Array<any> = [];
  /**
   * List of countries
   */
   countriesList: Array<any> = [];
   /**
   * List of countries
   */
    countriesListNot: Array<any> = [];
  /**
   * List of vaccine
   */
  vaccineList: Array<any> = [];
  
  /**
   * Misc
   */
  vaccineId: string = '';
  
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
   * Constructor for VaccineComponent
   * @param vaccineService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param permitsService Service used for filtering info according to the user permissions
   * @param diseaseService Service used to make requests to the backend
   * @param effectService Service used to make requests to the backend
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private vaccineService: VaccineService,
    private toastr: ToastrService,
    private permitsService: PermitsService,
    private diseaseService: DiseaseService,
    private effectService: EffectsService,
    private countryService: CountryService,
    private vaccinecountryService: VaccineCountryService,
    public translate: TranslateService,
    private emitterService: EmittersService
  ) {}

  /**
    * Loads the required data used by the component
   */
  ngOnInit(): void {
    //Obtener listado de Vacunas
    this.vaccineService.getVaccines().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.vaccineList = response.data;
          if (this.vaccineList.length == 0) {
            this.toastr.warning(
              this.translate.instant("VACCINE.NOVACCINES"),
              this.translate.instant("VACCINE.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
      }
    );
    //Obtener listado de enfermedades
    this.diseaseService.getDiseases().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.diseaseList = response.data;
        }
      },
      (error: any) => {
      }
    );
    //Obtener listado de efectos secundarios
    this.effectService.getEffects().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.effectsList = response.data;
        }
      },
      (error: any) => {
      }
    );

    //Obtener listado de paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.data.length > 0) {
          this.countriesList = response.data  
          for(let i = 0;i<this.countriesList.length;i++){
      this.updatedCountryList.push(this.countriesList[i].idCountry);
      this.countriesList[i].checked = true;
    } 

                 
          //elimina el pais "regional"
          let indice = this.countriesList.findIndex(
            (element) => element.idCountry == 1
          );
          this.countriesList.splice(indice, 1);
          this.updatedCountryList.splice(indice,1);
        } else {
          this.toastr.warning(
            this.translate.instant('COUNTRY.NOCOUNTRIES'),
            this.translate.instant('COUNTRY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('USERS.MANAGEMENT'));
      }
    );
    //Validacion de permisos
    this.canReview = this.permitsService.validate(Functions.VACCINE_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.VACCINE_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.VACCINE_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.VACCINE_DELETE);

    this.lang = localStorage.getItem("lang") || "en";

    this.langChange = this.emitterService
      .getLangChangeEmitter()
      .subscribe((value: string) =>{
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
   * Creates a new vaccine
   */
  saveVaccine() {
    if (this.validar()) {
      //Objeto
      let datos: any = {};
      datos['name_EN'] = this.nameEN;
      datos['title_EN'] = this.titleEN;
      datos['administration_EN'] = this.adminEN;
      datos['description_EN'] = this.descriptionEN;
      datos['name_ES'] = this.nameES;
      datos['title_ES'] = this.titleES;
      datos['administration_ES'] = this.adminES;
      datos['description_ES'] = this.descriptionES;
      datos['name_PT'] = this.namePT;
      datos['title_PT'] = this.titlePT;
      datos['administration_PT'] = this.adminPT;
      datos['description_PT'] = this.descriptionPT;
      datos['name_FR'] = this.nameFR;
      datos['title_FR'] = this.titleFR;
      datos['administration_FR'] = this.adminFR;
      datos['description_FR'] = this.descriptionFR;
      datos['diseases'] = this.modalDiseaseList;
      datos['secondary_effects'] = this.modalEffectList;
      //Request
      this.vaccineService.createVaccine(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant("VACCINE.KEEPVACCINE"), 
            this.translate.instant("VACCINE.MANAGEMENTS"));
          this.clear();
          this.ngOnInit();
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Deletes a vaccine
   * @param id id of the vaccine that will be deleted
   */
  deleteVaccine(id: string) {
    if (confirm(this.translate.instant("VACCINE.DELETEVACCINEQ"))) {
      this.vaccineService.removeVaccine(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("VACCINE.DELETEVACCINE"), 
              this.translate.instant("VACCINE.MANAGEMENTS"));
            this.ngOnInit();
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Loads the data to the modal of the vaccine that will be edited
   * @param id ID of the vaccine that will be edited
   */
  setVaccineId(id: string) {
    this.vaccineId = id;
    this.vaccineService.getVaccine(id).subscribe(
      (response: any) => {
        let datos = response.data;
        this.modalNameEN = datos.name_EN;
        this.modalNameES = datos.name_ES;
        this.modalNamePT = datos.name_PT;
        this.modalNameFR = datos.name_FR;
        this.modalTitleEN = datos.title_EN;
        this.modalTitleES = datos.title_ES;
        this.modalTitlePT = datos.title_PT;
        this.modalTitleFR = datos.title_FR;
        this.modalAdminEN = datos.administration_EN;
        this.modalAdminES = datos.administration_ES;
        this.modalAdminPT = datos.administration_PT;
        this.modalAdminFR = datos.administration_FR;
        this.modalDescriptionEN = datos.description_EN;
        this.modalDescriptionES = datos.description_ES;
        this.modalDescriptionPT = datos.description_PT;
        this.modalDescriptionFR = datos.description_FR;
        this.updatedDiseaseList = datos.diseases;
        this.updatedEffectList = datos.secondary_effects;
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
      }
    );
  }

  /**
   * Método Byron - Para enviar la info de el id de vacuna y el id de los paises
   * Loads the data to the modal of the vaccine that will be edited
   * @param id ID of the vaccine that will be edited
   */
   setVaccineIdCountry(id: string) {
    this.countriesList.forEach(country => country.checked = true)
    this.vaccineId = id;
    this.vaccineService.getVaccine(id).subscribe(
      (response: any) => {
        let datos = response.data;
        this.modalNameEN = datos.name_EN;
        this.modalNameES = datos.name_ES;
        this.modalNamePT = datos.name_PT;
        this.modalNameFR = datos.name_FR;
        this.modalTitleEN = datos.title_EN;
        this.modalTitleES = datos.title_ES;
        this.modalTitlePT = datos.title_PT;
        this.modalTitleFR = datos.title_FR;
        this.modalAdminEN = datos.administration_EN;
        this.modalAdminES = datos.administration_ES;
        this.modalAdminPT = datos.administration_PT;
        this.modalAdminFR = datos.administration_FR;
        this.modalDescriptionEN = datos.description_EN;
        this.modalDescriptionES = datos.description_ES;
        this.modalDescriptionPT = datos.description_PT;
        this.modalDescriptionFR = datos.description_FR;
        this.updatedDiseaseList = datos.diseases;
        this.updatedEffectList = datos.secondary_effects;
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
      }
    );
  }
  /**
   * Updates a vaccine
   */
  updateVaccine() {
    let datos: any = {};
    datos['idVaccine'] = this.vaccineId;
    datos['name_EN'] = this.modalNameEN;
    datos['title_EN'] = this.modalTitleEN;
    datos['administration_EN'] = this.modalAdminEN;
    datos['description_EN'] = this.modalDescriptionEN;
    datos['name_ES'] = this.modalNameES;
    datos['title_ES'] = this.modalTitleES;
    datos['administration_ES'] = this.modalAdminES;
    datos['description_ES'] = this.modalDescriptionES;
    datos['name_PT'] = this.modalNamePT;
    datos['title_PT'] = this.modalTitlePT;
    datos['administration_PT'] = this.modalAdminPT;
    datos['description_PT'] = this.modalDescriptionPT;
    datos['name_FR'] = this.modalNameFR;
    datos['title_FR'] = this.modalTitleFR;
    datos['administration_FR'] = this.modalAdminFR;
    datos['description_FR'] = this.modalDescriptionFR;
    datos['diseases'] = this.updatedDiseaseList;
    datos['secondary_effects'] = this.updatedEffectList;
    this.vaccineService.updateVaccine(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("VACCINE.UPDATEVACCINE2"), 
            this.translate.instant("VACCINE.MANAGEMENTS"));
          this.ngOnInit();
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
      }
    );
  }

  /**
   * Updates a vaccines country
   */
   updateVaccine_Country() {    
    // //aqui empieza mi codigo de pruebas
    // this.vaccinecountryService.removeVaccineCountry(this.vaccineId,"1").subscribe(
    //   (response: any) => {
    //     if (response.statusCode == 200) {
    //       this.toastr.success(
    //         this.translate.instant("VACCINE.DELETEVACCINE"), 
    //         this.translate.instant("VACCINE.MANAGEMENTS"));
    //       this.ngOnInit();
    //     }
    //   },
    //   // (error) => {
    //   //   this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
    //   // }
    // );
    // //aqui termina mi codigo de pruebas
    
    let datos = new FormData();    
    datos.append("idVaccine",""+this.vaccineId) 
    datos.append('countries',JSON.stringify(this.countriesList.filter(country => country.checked).map(country => country.idCountry)));
    datos.append('countriesnot',JSON.stringify(this.countriesList.filter(country => country.checked==false).map(country => country.idCountry)));

    this.vaccinecountryService.createVaccineCountry(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("VACCINE.UPDATEVACCINE2"), 
            this.translate.instant("VACCINE.MANAGEMENTS"));
          this.ngOnInit();
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("VACCINE.MANAGEMENTS"));
      }
    );
  }

  /**
   * Adds diseases to the vaccine selected
   * @param id Id of the vaccine
   */
  setDiseases(id: string) {
    if (this.modalDiseaseList.includes(id)) {
      let index = this.modalDiseaseList.findIndex((item) => item == id);
      this.modalDiseaseList.splice(index, 1);
    } else {
      this.modalDiseaseList.push(id);
    }
  }

  /**
   * Adds secondary effects to the vaccine selected
   * @param id id of the selected vaccine
   */
  setEffect(id: string) {
    if (this.modalEffectList.includes(id)) {
      let index = this.modalEffectList.findIndex((item) => item == id);
      this.modalEffectList.splice(index, 1);
    } else {
      this.modalEffectList.push(id);
    }
  }

  //------- Metodos para el modal de actualizacion ----------

  /**
   * method for checking diseases
   * @param id ID of the selected vaccine
   * @returns true if the vaccine have diseases
   */
  hasDisease(id: string): boolean {
    return this.updatedDiseaseList.findIndex((item) => item == id) >= 0
      ? true
      : false;
  }

  /**
   * method for checking diseases
   * @param id ID of the selected vaccine
   * @returns true if the vaccine have diseases
   */
   hasCountry(id: string): boolean {
    return this.updatedCountryList.findIndex((item) => item == id) >= 0
      ? true
      : false;
  }
  

  /**
   * updates the diseases of the selected vaccine
   * @param id Id of the vaccine
   */
  setUpdatedDiseases(id: string) {
    if (this.updatedDiseaseList.includes(id)) {
      let index = this.updatedDiseaseList.findIndex((item) => item == id);
      this.updatedDiseaseList.splice(index, 1);
    } else {
      this.updatedDiseaseList.push(id);
    }
  }

  /**
   * Method for checking effects
   * @param id Id of the vaccine
   * @returns If the vaccine has the effect
   */
  hasEffect(id: string): boolean {
    return this.updatedEffectList.findIndex((item) => item == id) >= 0
      ? true
      : false;
  }

  /**
   * Method for checking effects
   * @param id Id of the vaccine
   * @returns If the vaccine has the effect
   */
   newCountry(id: string): boolean {
    return this.updatedCountryList.findIndex((item) => item == id) >= 0
      ? true
      : false;
  }

  /**
   * Updates the effects of the selected vaccine
   * @param id ID of hte selected vaccine
   */
  setUpdatedEffect(id: string) {
    if (this.updatedEffectList.includes(id)) {
      let index = this.updatedEffectList.findIndex((item) => item == id);
      this.updatedEffectList.splice(index, 1);
    } else {
      this.updatedEffectList.push(id);
    }
    
  }

  //-------------- Fin de metodos de Modal de Actualizacion -------------------------

  /**
   * Adds diseases
   * @param id Id of hte selected vaccine
   */
  setUpdatesDiseases(id: string) {
    if (this.modalDiseaseList.includes(id)) {
      let index = this.modalDiseaseList.findIndex((item) => item == id);
      this.modalDiseaseList.splice(index, 1);
    } else {
      this.modalDiseaseList.push(id);
    }
  }
  /**
   * Validates the form data
   * @returns True if the form is valid
   */
  validar(): boolean {
    let val: number = 0;
    if (
      this.nameEN.trim().length > 0 &&
      this.titleEN.trim().length > 0 &&
      this.adminEN.trim().length > 0 &&
      this.descriptionEN.trim().length > 0
    ) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("VACCINE.ENGLISHERR"), 
        this.translate.instant("VACCINE.MANAGEMENTS"));
    }

    if (
      this.nameES.trim().length > 0 &&
      this.titleES.trim().length > 0 &&
      this.adminES.trim().length > 0 &&
      this.descriptionES.trim().length > 0
    ) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("VACCINE.SPANISHERR"), 
        this.translate.instant("VACCINE.MANAGEMENTS"));
    }

    if (
      this.namePT.trim().length > 0 &&
      this.titlePT.trim().length > 0 &&
      this.adminPT.trim().length > 0 &&
      this.descriptionPT.trim().length > 0
    ) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("VACCINE.PORTUGUESEERR"),  
        this.translate.instant("VACCINE.MANAGEMENTS"));
    }

    if (
      this.nameFR.trim().length > 0 &&
      this.titleFR.trim().length > 0 &&
      this.adminFR.trim().length > 0 &&
      this.descriptionFR.trim().length > 0
    ) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("VACCINE.FRENCHERR"), 
        this.translate.instant("VACCINE.MANAGEMENTS"));
    }
    return val === 4 ? true : false;
  }

  /**
   * Cleans the data of the form
   */
  clear() {
    this.nameEN = '';
    this.nameES = '';
    this.namePT = '';
    this.nameFR = '';
    this.titleEN = '';
    this.titleES = '';
    this.titlePT = '';
    this.titleFR = '';
    this.adminEN = '';
    this.adminES = '';
    this.adminPT = '';
    this.adminFR = '';
    this.descriptionEN = '';
    this.descriptionES = '';
    this.descriptionPT = '';
    this.descriptionFR = '';
    this.modalDiseaseList = [];
    this.modalEffectList = [];
  }

  updateModal(pais:any){
    pais.checked = !pais.checked
  }
}
