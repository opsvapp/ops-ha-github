import { Component, OnDestroy, OnInit } from '@angular/core';
//Servicio de Enfermedades
import { CountryService } from '../../services/country.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { EmittersService } from '../../services/emitters/emitters.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * Table where the users will be able to create, update or delete the countries, administrations 1 and administrations 2 of each one
 */
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit, OnDestroy {
  //ngModels
  /**
   * Country code of the country
   */
  countryCode: string = '';
  /**
   * If the country is activated
   */
  activated: string = 'true';
  /**
    * Name of the country in english
   */
  nameEN: string = '';
  /**
    * Name of the country in spanish
   */
  nameES: string = '';
  /**
    * Name of the country in portuguese
   */
  namePT: string = '';
  /**
    * Name of the country in french
   */
  nameFR: string = '';

  /**
   * Origin country
   */
  originCountry: string = '';
  /**
    * Name of the administration 1 in english
   */
  adminOneNameEN: string = '';
  /**
    * Name of the administration 1 in spanish
   */
  adminOneNameES: string = '';
  /**
    * Name of the administration 1 in portuguese
   */
  adminOneNamePT: string = '';
  /**
    * Name of the administration 1 in french
   */
  adminOneNameFR: string = '';

  /**
   * Id of the country that was selected to seach its administrations 2
   */
  adminTwoCountry: string = '';
  
  /**
   * ID of the administration 1 that was selected to search its administrations 2
   */
  adminTwoAdmin: string = '';
  /**
    * Name of the administration 2 in english
   */
  adminTwoNameEN: string = '';
  /**
    * Name of the administration 2 in spanish
   */
  adminTwoNameES: string = '';
  /**
    * Name of the administration 2 in portuguese
   */
  adminTwoNamePT: string = '';
  /**
    * Name of the administration 2 in french
   */
  adminTwoNameFR: string = '';

  //Modal ngModels
    /**
    * modal value used for the country code
   */
  modalCountryCode: string = '';
    /**
    * Bool used to show or hide the modal
   */
  modalActivated: string = 'true';
  
  /**
    * Name of the modal used for country in english
   */
  modalNameEN: string = '';
  /**
    * Name of the modal used for country in spanish
   */
  modalNameES: string = '';
  /**
    * Name of the modal used for country in portuguese
   */
  modalNamePT: string = '';
  /**
    * Name of the modal used for country in french
   */
  modalNameFR: string = '';

  /**
    * Name of the modal used for administration 1 in english
   */
  modalAdminOneNameEN: string = '';
  /**
    * Name of the modal used for administration 1 in spanish
   */
  modalAdminOneNameES: string = '';
  /**
    * Name of the modal used for administration 1 in portuguese
   */
  modalAdminOneNamePT: string = '';
  /**
    * Name of the modal used for administration 1 in french
   */
  modalAdminOneNameFR: string = '';

  /**
    * Name of the modal used for administration 1 in english
   */
  modalAdminTwoNameEN: string = '';
  /**
    * Name of the modal used for administration 1 in spanish
   */
  modalAdminTwoNameES: string = '';
  /**
    * Name of the modal used for administration 1 in portuguese
   */
  modalAdminTwoNamePT: string = '';
  /**
    * Name of the modal used for administration 1 in french
   */
  modalAdminTwoNameFR: string = '';

  //Var
  /**
    * Country unique id
   */
  countryId: string = '';
  
  /**
    * List of countries shown in the table
   */
  countryList: Array<any> = [];

    /**
    * Administration 1 unique id
   */
  adminOneId: string = '';
    /**
    * List of administrations 1 shown in the table
   */
  adminOneList: Array<any> = [];

    /**
    * Administration 2 unique id
   */
  adminTwoId: string = '';
    /**
    * List of administrations2 shown in the table
   */
  adminTwoList: Array<any> = [];

  //Permisos
  /**
    * Permission used to let the user Review
   */
  canReview: boolean = false;
  /**
    * Permission used to let the user Create
   */
  canCreate: boolean = false;
  /**
    * Permission used to let the user Update
   */
  canUpdate: boolean = false;
  /**
    * Permission used to let the user Delete
   */
  canDelete: boolean = false;

  /**
    * Permission used to let the user Review administration 1
   */
  canReviewAdminOne: boolean = false;
  /**
    * Permission used to let the user Create administration 1
   */
  canCreateAdminOne: boolean = false;
  /**
    * Permission used to let the user Update administration 1
   */
  canUpdateAdminOne: boolean = false;
  /**
    * Permission used to let the user Delete administration 1
   */
  canDeleteAdminOne: boolean = false;

  /**
    * Permission used to let the user Review administration 2
   */
  canReviewAdminTwo: boolean = false;
  /**
    * Permission used to let the user Create administration 2
   */
  canCreateAdminTwo: boolean = false;
  /**
    * Permission used to let the user Update administration 2
   */
  canUpdateAdminTwo: boolean = false;
  /**
    * Permission used to let the user Delete administration 2
   */
  canDeleteAdminTwo: boolean = false;

  /**
    * Language used in the app
   */
  lang: string = "en";
  /**
    * subscribes to language changes
   */
  langChange: Subscription | undefined;

  /**
   * Constructor for country component
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param countryService Service used to make requests to the backend
   * @param permitsService Service used for filtering info according to the user permissions
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private toastr: ToastrService,
    private countryService: CountryService,
    private permitsService: PermitsService,
    private emitterService: EmittersService,
    public translate: TranslateService,
  ) {}

  /**
    * Calls the backend to fill the data and locks the functions that the user doenst have permission to use
   */
  ngOnInit(): void {
    this.getCountries();
    this.canReview = this.permitsService.validate(Functions.COUNTRY_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.COUNTRY_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.COUNTRY_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.COUNTRY_DELETE);

    this.canReviewAdminOne = this.permitsService.validate(
      Functions.ADMIN1_REVIEW
    );
    this.canCreateAdminOne = this.permitsService.validate(
      Functions.ADMIN1_CREATE
    );
    this.canUpdateAdminOne = this.permitsService.validate(
      Functions.ADMIN1_UPDATE
    );
    this.canDeleteAdminOne = this.permitsService.validate(
      Functions.ADMIN1_DELETE
    );

    this.canReviewAdminTwo = this.permitsService.validate(
      Functions.ADMIN2_REVIEW
    );
    this.canCreateAdminTwo = this.permitsService.validate(
      Functions.ADMIN2_CREATE
    );
    this.canUpdateAdminTwo = this.permitsService.validate(
      Functions.ADMIN2_UPDATE
    );
    this.canDeleteAdminTwo = this.permitsService.validate(
      Functions.ADMIN2_DELETE
    );

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
    * Request the countries to the backend service
   */
  private getCountries() {
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.countryList = response.data;

          //elimina el pais "regional"
          let indice = this.countryList.findIndex(
            (element) => element.idCountry == 1
          );
          this.countryList.splice(indice, 1);

          if (this.countryList.length == 0) {
            this.toastr.warning(
              this.translate.instant("COUNTRY.NOCOUNTRIES"),
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
      }
    );
  }

  /**
    * Request the administration 1 associated with the specified country to the backend service
   */
  getCountryAdmins() {
    this.countryService.getAdminOne(this.countryId).subscribe(
      (response: any) => {
        if (response.data.length > 0) {
          this.adminOneList == response.data;
        } else {
          this.toastr.error(
            this.translate.instant("COUNTRY.NOADMIN1"), 
            this.translate.instant("COUNTRY.MANAGEMENT")
          );
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENT"));
      }
    );
  }

  /**
    * Sets the country id
   */
  setCountryId(id: string) {
    this.countryId = id;
    this.countryService.getCountry(id).subscribe(
      (response: any) => {
        let datos = response.data;
        this.modalCountryCode = datos.countryCode;
        this.modalNameEN = datos.name_EN;
        this.modalNameES = datos.name_ES;
        this.modalNamePT = datos.name_PT;
        this.modalNameFR = datos.name_FR;
        this.modalActivated = datos.activated == 1 ? 'true' : 'false';
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
      }
    );
  }

  /**
    * Sends a new request to the backend service to save a new country and sends its data
   */
  saveCountry() {
    if (this.validar()) {
      //Objeto
      let datos = new FormData();
      datos.append('countryCode', this.countryCode);
      datos.append('name_EN', this.nameEN);
      datos.append('name_ES', this.nameES);
      datos.append('name_PT', this.namePT);
      datos.append('name_FR', this.nameFR);
      datos.append('activated', this.activated);
      this.countryService.createCountry(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant("COUNTRY.COUNTRYSAVED"), 
            this.translate.instant("COUNTRY.MANAGEMENTS")
          );
          this.clear();
          this.getCountries();
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
    * Sends a new request to the backend service to update country and sends its data
   */
  updateCountry() {
    let datos = new FormData();
    datos.append('idCountry', this.countryId);
    datos.append('countryCode', this.modalCountryCode);
    datos.append('name_EN', this.modalNameEN);
    datos.append('name_ES', this.modalNameES);
    datos.append('name_PT', this.modalNamePT);
    datos.append('name_FR', this.modalNameFR);
    datos.append('activated', this.modalActivated);
    this.countryService.updateCountry(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("COUNTRY.COUNTRYUPDATED"),
            this.translate.instant("COUNTRY.MANAGEMENTS")
          );
          this.getCountries();
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
      }
    );
  }

  /**
    * Sends a new request to the backend service to delete a country and sends its id
   */
  deleteCountry(id: string) {
    if (confirm(this.translate.instant("COUNTRY.COMFIRMDELETE"))) {
      this.countryService.removeCountry(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("COUNTRY.COUNTRYDELETED"),
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
            this.getCountries();
          } else {
            this.toastr.warning(response.message, this.translate.instant("COUNTRY.MANAGEMENTS"));
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
    * Validates if the country data of the form is valid
   */
  validar(): boolean {
    let val: number = 0;

    if (this.nameEN.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKCODE"),
        this.translate.instant("COUNTRY.VALIDATION")
      );
    }

    if (this.nameEN.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKENGLISH"),
        this.translate.instant("COUNTRY.VALIDATION")
      );
    }

    if (this.nameES.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKSPANISH"),
        this.translate.instant("COUNTRY.VALIDATION")
      );
    }

    if (this.namePT.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKPORTUGUESE"),
        this.translate.instant("COUNTRY.VALIDATION")
      );
    }

    if (this.nameFR.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKFRENCH"),
        this.translate.instant("COUNTRY.VALIDATION")
      );
    }
    return val === 5 ? true : false;
  }

  /**
    * Cleans the data of the modal
   */
  clear() {
    this.nameEN = '';
    this.nameES = '';
    this.namePT = '';
    this.nameFR = '';
    this.countryCode = '';
    this.activated = 'true';
  }

  /*******************************
   * Metodos de Administracion 1 *
   ******************************/
  /**
    * Sends a new request to the backend service to save a new administration 1 and sends its data
   */
  saveAdminOne() {
    if (this.validateAdminOne()) {
      let datos: any = new FormData();
      datos.append('idCountry', this.originCountry);
      datos.append('name_EN', this.adminOneNameEN);
      datos.append('name_ES', this.adminOneNameES);
      datos.append('name_PT', this.adminOneNamePT);
      datos.append('name_FR', this.adminOneNameFR);
      this.countryService.createAdminOne(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant("COUNTRY.ADMIN1SAVED"), 
            this.translate.instant("COUNTRY.MANAGEMENTS")
          );
          this.clearAdminOne();
          this.getAdminsOne();
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
    * Sends a new request to the backend service to update an administration 1 and sends its data
   */
  updateAdminOne() {
    if (this.validateAdminOneModal()) {
      let datos = new FormData();
      datos.append('idCountry', this.originCountry);
      datos.append('idAdmin_1', this.adminOneId);
      datos.append('name_EN', this.modalAdminOneNameEN);
      datos.append('name_ES', this.modalAdminOneNameES);
      datos.append('name_PT', this.modalAdminOneNamePT);
      datos.append('name_FR', this.modalAdminOneNameFR);
      this.countryService.updateAdminOne(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant("COUNTRY.ADMIN1UPDATED"), 
            this.translate.instant("COUNTRY.MANAGEMENTS")
          );
          this.getAdminsOne();
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * sends a request to the backend to get all the administration 1
   */
  setAdminOneCountry(id: string) {
    this.originCountry = id;
    this.getAdminsOne();
  }

  /**
   * gets all the administrations 1 from the indicated country
   */
  getAdminsOne() {
    this.adminOneList = [];
    this.adminTwoList = [];
    this.countryService.getAllAdminOne(this.originCountry).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if (response.data.admins_1.length > 0) {
            this.adminOneList = response.data.admins_1;
          } else {
            this.toastr.warning(
              this.translate.instant("COUNTRY.NOADMINSFOUND"),
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
      }
    );
  }

  /**
   * Sets the selected id
   */
  setAdminOneId(id: string) {
    this.adminOneId = id;
    this.countryService.getAdminOne(this.adminOneId).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          let datos = response.data;
          this.modalAdminOneNameEN = datos.name_EN;
          this.modalAdminOneNameES = datos.name_ES;
          this.modalAdminOneNamePT = datos.name_PT;
          this.modalAdminOneNameFR = datos.name_FR;
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
      }
    );
  }

  /**
   * Sends a new request to the backend service to delete an administration 1 and sends its id
   */
  deleteAdminOne(id: string) {
    if (confirm(this.translate.instant("COUNTRY.MANAGEMENTS"))) {
      this.countryService.removeAdminOne(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("COUNTRY.ADMIN1DELETED"),
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
            this.getAdminsOne();
          } else {
            this.toastr.warning(response.message, this.translate.instant("COUNTRY.MANAGEMENTS"));
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Validates all the data to create an administration 1
   * @returns True if all the data is valid
   */
  validateAdminOne(): boolean {
    let c: number = 0;
    if (this.adminOneNameEN.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKENGLISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.adminOneNameES.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKSPANISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.adminOneNamePT.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKPORTUGUESE"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.adminOneNameFR.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKFRENCH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }

    if (this.originCountry.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.SELECTCOUNTRY"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    return c === 5 ? true : false;
  }

  /**
   * Validates the data of the modal
   * @returns True if all the data is valid
   */
  validateAdminOneModal(): boolean {
    let c: number = 0;
    if (this.modalAdminOneNameEN.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKENGLISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.modalAdminOneNameES.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKSPANISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.modalAdminOneNamePT.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKPORTUGUESE"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.modalAdminOneNameFR.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKFRENCH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }

    return c === 4 ? true : false;
  }

  /**
    * Cleans the data of the modal
   */
  clearAdminOne() {
    this.adminOneNameEN = '';
    this.adminOneNameES = '';
    this.adminOneNamePT = '';
    this.adminOneNameFR = '';
  }

  /*******************************
   * Metodos de Administracion 2 *
   ******************************/

  /**
   * Sends a new request to the backend service to save a new administration 1 and sends its data
   */
  setAdminTwoCountryId(id: string) {
    this.originCountry = id;
    this.getAdminsOne();
  }

  /**
   * Sets the administration 1 ID, and gets the administrations 2 of the selected country and administration 1
   */
  setAdminTwoAdmin(id: string) {
    this.adminTwoAdmin = id;
    this.getAdminTwoList(this.adminTwoAdmin);
  }

    /**
   * sends a request to the backend to get all the administration 2 of the selected country and administration 1
   */
  getAdminTwoList(id: string) {
    this.countryService.getAllAdminTwo(id).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          let tempList: Array<any> = response.data.admins_2;
          if (tempList.length > 0) {
            this.adminTwoList = tempList;
          } else {
            this.toastr.warning(
              this.translate.instant("COUNTRY.NOADMINSFOUND"),
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
            this.adminTwoList = [];
          }
        } else {
          this.toastr.warning(response.message, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
      }
    );
  }

  /**
   * Sends a new request to the backend service to save a new administration 2 and sends its data
   */
  saveAdminTwo() {
    if (this.validateAdminTwo()) {
      let datos = new FormData();
      datos.append('idAdmin_1', this.adminTwoAdmin);
      datos.append('name_EN', this.adminTwoNameEN);
      datos.append('name_ES', this.adminTwoNameES);
      datos.append('name_PT', this.adminTwoNamePT);
      datos.append('name_FR', this.adminTwoNameFR);
      this.countryService.createAdminTwo(datos).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("COUNTRY.ADMIN2SAVED"), 
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
            this.getAdminTwoList(this.adminTwoAdmin);
            this.clearAdminTwo();
          } else {
            this.toastr.warning(response.message, this.translate.instant("COUNTRY.MANAGEMENTS"));
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Sends a new request to the backend service to delete an administration 2 and sends its id
   */
  deleteAdminTwo(id: string) {
    if (confirm(this.translate.instant("COUNTRY.ADMIN2DELETE"))) {
      this.countryService.removeAdminTwo(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("COUNTRY.ADMIN2DELETED"), 
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
            this.getAdminTwoList(this.adminTwoAdmin);
          } else {
            this.toastr.warning(response.message, this.translate.instant("COUNTRY.MANAGEMENTS"));
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Sets the data of the selected administration 2 to the modal data
   */
  setAdminTwo(id: string) {
    this.adminTwoId = id;
    this.countryService.getAdminTwo(this.adminTwoId).subscribe(
      (response:any) => {
        if (response.statusCode == 200) {
          let datos = response.data;
          this.modalAdminTwoNameEN = datos.name_EN || '';
          this.modalAdminTwoNameES = datos.name_ES || '';
          this.modalAdminTwoNamePT = datos.name_PT || '';
          this.modalAdminTwoNameFR = datos.name_FR || '';
        }        
      },
      (error:any) => {
        this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
      }
    );
  }

  /**
   * Sends a new request to the backend service to update an administration 2 and sends its data
   */
  updateAdminTwo() {
    if (this.validateAdminTwoModal()) {
      let datos = new FormData();
      datos.append('idAdmin_1', this.adminTwoAdmin);
      datos.append('idAdmin_2', this.adminTwoId);
      datos.append('name_EN', this.modalAdminTwoNameEN);
      datos.append('name_ES', this.modalAdminTwoNameES);
      datos.append('name_PT', this.modalAdminTwoNamePT);
      datos.append('name_FR', this.modalAdminTwoNameFR);
      this.countryService.updateAdminTwo(datos).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("COUNTRY.ADMIN2UPDATED"), 
              this.translate.instant("COUNTRY.MANAGEMENTS")
            );
            this.getAdminTwoList(this.adminTwoAdmin);
          }
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("COUNTRY.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Validates if all the data of the administration 2 is valid
   */
  validateAdminTwo(): boolean {
    let c: number = 0;
    if (this.adminTwoNameEN.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKENGLISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.adminTwoNameES.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKSPANISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.adminTwoNamePT.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKPORTUGUESE"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.adminTwoNameFR.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKFRENCH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.originCountry.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.SELECTCOUNTRY"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.adminTwoAdmin.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.SELECTADMIN1"), 
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    return c === 6 ? true : false;
  }

  /**
   * Validates if all the data from the modal of the administration 2 is valid
   */
  validateAdminTwoModal(): boolean {
    let c: number = 0;
    if (this.modalAdminTwoNameEN.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKENGLISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.modalAdminTwoNameES.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKSPANISH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.modalAdminTwoNamePT.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKPORTUGUESE"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    if (this.modalAdminTwoNameFR.trim().length > 0) {
      c += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("COUNTRY.CHECKFRENCH"),
        this.translate.instant("COUNTRY.MANAGEMENT")
      );
    }
    return c === 4 ? true : false;
  }

  /**
   * Cleans the data of the modal
   */
  clearAdminTwo() {
    this.adminTwoNameEN = '';
    this.adminTwoNameES = '';
    this.adminTwoNamePT = '';
    this.adminTwoNameFR = '';
  }
}
