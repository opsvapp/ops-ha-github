import { Component, OnDestroy, OnInit } from '@angular/core';
//Servicios de peticiones
import { CountryService } from '../../services/country.service';
import { VaccineService } from '../../services/vaccine.service';
import { TravelVaccineService } from '../../services/travel-vaccine.service';
//Toastr
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { VaccineCountryService } from 'src/app/services/vaccine-country.service';

/**
 * Component to create, update, delete and review travel-vaccines 
 */
@Component({
  selector: 'app-travel-vaccine',
  templateUrl: './travel-vaccine.component.html',
  styleUrls: ['./travel-vaccine.component.css'],
})
export class TravelVaccineComponent implements OnInit, OnDestroy {
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

  //ngModels
  /**
   * ngModel for modalMandatory
   */
  modalMandatory: boolean = false;
  /**
   * ngModel for modalMonths
   */
  modalMonths: string = '';
  /**
   * ngModel for country
   */
  country: string = '';
  /**
   * ngModel for vaccine
   */
  vaccine: string = '';

  //Listas
  /**
   * List of country
   */
  countryList: Array<any> = [];
  /**
   * List of countryVaccine
   */
  countryVaccineList: Array<any> = [];
  /**
   * List of vaccine
   */
  vaccineList: Array<any> = [];
  /**
   * List of vaccine
   */
   vaccineListExist: Array<any> = [];
    /**
   * List of vaccine
   */
     vaccineListTemp: Array<any> = [];
  //Var
  /**
   * Id of the country selected
   */
  countryId: string = '';
  /**
   * ID of the vaccine selected
   */
  vaccineId: string = '';
  /**
   * Flag that indicates if the vaccine is required by the country
   */
  requiredVaccine: boolean = false;
  /**
   * Valid months of the vaccine
   */
  validity: string = '';

  /**
    * Language used in the app
   */
  lang: string = "en";
  /**
     * subscribes to language changes
     */
  langChange: Subscription | undefined;

    /**
     * Flag that indicates if the user is regional
     */
    regional: boolean = true;
    /**
     * Selected country
     */
    workingCountry: Number = 1;
  /**
   * COnstructor for travel-vaccineComponent
   * @param countryService  Service used to make requests to the backend
   * @param vaccineService  Service used to make requests to the backend
   * @param permitsService Service used for filtering info according to the user permissions
   * @param travelService Service used to make requests to the backend
   * @param vaccineCountryService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private countryService: CountryService,
    private vaccineService: VaccineService,
    private permitsService: PermitsService,
    private travelService: TravelVaccineService,
    private vaccineCountryService:VaccineCountryService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private emitterService: EmittersService
  ) {}

  /**
   * Request countries, vaccines and validates permissions
   */
  ngOnInit(): void {
    // Solicitar listado de paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.countryList = response.data;
          //Elimina los otros paises si el usuario no es regional
          if (localStorage.getItem('regional') == 'false') {
            let pais: any = this.countryList.find(
              (element) =>
                element.idCountry == localStorage.getItem('idCountry')
            );
            this.countryList = [];
            this.countryList.push(pais);
          } else {
            let indice = this.countryList.findIndex(
              (element) => element.idCountry == 1
            );
            this.countryList.splice(indice, 1);
          }
        }
      },
      (error: any) => {
        this.toastr.error(
          error,
          this.translate.instant('TRAVELVACCINE.MANAGEMENT')
        );
      }
    );
    //Solicitar listado de vacunas
    this.vaccineService.getVaccines().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.vaccineList = response.data;
        }
      },
      (error: any) => {
        this.toastr.error(
          error,
          this.translate.instant('TRAVELVACCINE.MANAGEMENT')
        );
      }
    );
    //Validacion de permisos
    this.canReview = this.permitsService.validate(Functions.TRAVEL_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.TRAVEL_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.TRAVEL_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.TRAVEL_DELETE);
    //Idioma
    this.lang = localStorage.getItem('lang') || 'en';
    this.langChange = this.emitterService
      .getLangChangeEmitter()
      .subscribe((value: string) => {
        this.lang = value;
      });
  }

  /**
   * Unsubscribes to language changes
   */
  ngOnDestroy(): void {
    this.langChange?.unsubscribe();
  }

  /**
   * Load the list of vaccines assigned to the country
   * @param id ID of hte country to load
   */
  onChangeCountry(id: string) {
    this.countryId = id;
    this.getCountryVaccineList();
    this.getVaccineCountryList();
  }
  private getVaccineCountryList() {
    this.vaccineCountryService.getVaccinesCountry(this.countryId).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if (response.data.length > 0) {
            this.vaccineListExist = response.data;
            this.listarVacunas();
          } else {
            this.vaccineList = [];
            this.toastr.warning(
              this.translate.instant('VCENTER.NOHVACCINES'),
              this.translate.instant('VCENTER.MANAGEMENTS')
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('VCENTER.MANAGEMENTS'));
      }
    );
  }
  private listarVacunas() {
    //Solicitar listado de vacunas

    this.vaccineService.getVaccines().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.vaccineList = response.data;
          this.vaccineList.forEach((vaccine) => {
            if (this.vaccineListExist.includes(vaccine.idVaccine)) {
              this.vaccineListTemp.push(vaccine);
            }
          });

          this.vaccineList = this.vaccineListTemp;
          //this.countryVaccineList = this.vaccineListTemp;
          this.vaccineListTemp = [];

          if (this.vaccineList.length == 0) {
            this.toastr.warning(
              this.translate.instant('VCENTER.NOVACCINES'),
              this.translate.instant('VCENTER.MANAGEMENTS')
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('VCENTER.MANAGEMENTS'));
      }
    );
  }

  /**
   * Gets the vaccine list that a country has
   */
  private getCountryVaccineList() {
    this.travelService.getCountryVaccine(this.countryId).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if (response.data.length > 0) {
            this.countryVaccineList = response.data;
          } else {
            this.countryVaccineList = [];
            this.toastr.warning(
              this.translate.instant('TRAVELVACCINE.NOVACCINES'),
              this.translate.instant('TRAVELVACCINE.MANAGEMENT')
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(
          error,
          this.translate.instant('TRAVELVACCINE.MANAGEMENT')
        );
      }
    );
  }

  /**
   * Get the List ID
   * @param id ID of the vaccine to change
   */
  onChangeVaccine(id: string) {
    this.vaccineId = id;
  }

  /**
   * Creates a new relation between a vaccine and a country
   */
  saveTravelVaccine() {
    if (this.validar()) {
      let datos = new FormData();
      datos.append('idCountry', this.countryId);
      datos.append('idVaccine', this.vaccineId);
      let tempReq = this.requiredVaccine ? '1' : '0';
      datos.append('required', tempReq);
      datos.append('validityMonths', this.validity);
      this.travelService.setTravelVaccine(datos).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant('TRAVELVACCINE.SAVEVACCINE'),
              this.translate.instant('TRAVELVACCINE.MANAGEMENT')
            );
            this.getCountryVaccineList();
            this.clear();
          }
        },
        (error: any) => {
          this.toastr.error(
            error,
            this.translate.instant('TRAVELVACCINE.MANAGEMENT')
          );
        }
      );
    }
  }

  /**
   * Deletes a relation between a vaccine and a country
   * @param vaccineId Vaccine to remove
   */
  deleteCountryVaccine(vaccineId: string) {
    if (confirm(this.translate.instant('TRAVELVACCINE.CONFIRMDELETE'))) {
      this.travelService
        .deleteCountryVaccine(this.countryId, vaccineId)
        .subscribe(
          (response: any) => {
            if (response.statusCode == 200) {
              this.toastr.success(
                this.translate.instant('TRAVELVACCINE.DELETEVACCINE'),
                this.translate.instant('TRAVELVACCINE.MANAGEMENT')
              );
              this.getCountryVaccineList();
            }
          },
          (error: any) => {
            this.toastr.error(
              error,
              this.translate.instant('TRAVELVACCINE.MANAGEMENT')
            );
          }
        );
    }
  }

  /**
   * Set the ID that is working
   * @param id ID of the working vaccine
   */
  setUpdateId(id: string) {
    this.vaccineId = id;
    let tempVaccine = this.countryVaccineList.find(
      (element) => element.idVaccine == this.vaccineId
    );
    this.modalMonths = tempVaccine.validityMonths;
    this.modalMandatory = tempVaccine.required == '1' ? true : false;
  }

  /**
   * Uodates the information of the country
   */
  updateCountryVaccine() {
    let datos = new FormData();
    datos.append('idCountry', this.countryId);
    datos.append('idVaccine', this.vaccineId);
    let tempReq = this.modalMandatory ? '1' : '0';
    datos.append('required', tempReq);
    datos.append('validityMonths', String(this.modalMonths));
    this.travelService.updateTravelVaccine(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant('TRAVELVACCINE.UPDATEVACCINE'),
            this.translate.instant('TRAVELVACCINE.MANAGEMENT')
          );
          this.getCountryVaccineList();
        }
      },
      (error: any) => {
        this.toastr.error(
          error,
          this.translate.instant('TRAVELVACCINE.MANAGEMENT')
        );
      }
    );
  }

  /**
   * Validates the form
   * @returns True if the form is valid
   */
  validar(): boolean {
    let cuenta: number = 0;
    if (this.countryId != '' && this.vaccineId != '') {
      cuenta += 1;
    } else {
      this.toastr.warning(
        this.translate.instant('TRAVELVACCINE.CHECKCOUNTRYANDVACCINE'),
        this.translate.instant('TRAVELVACCINE.MANAGEMENT')
      );
    }
    //Buscar duplicados
    let find = this.countryVaccineList.find(
      (element) => element.idVaccine == this.vaccineId
    );
    if (!find) {
      cuenta += 1;
    } else {
      this.toastr.warning(
        this.translate.instant('TRAVELVACCINE.ALREADYEXISTS'),
        this.translate.instant('TRAVELVACCINE.MANAGEMENT')
      );
    }
    return cuenta === 2 ? true : false;
  }

  /**
   * Cleans the form data
   */
  clear() {
    this.requiredVaccine = false;
    this.validity = '';
  }
}
