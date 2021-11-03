import { Component, OnInit } from '@angular/core';
//Servicios de peticiones
import { CountryService } from '../../services/country.service';
import { VaccineService } from '../../services/vaccine.service';
import { HealthCenterService } from '../../services/health-center.service';
import { VaccineCenterService } from '../../services/vaccine-center.service';

//Toastr
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { VaccineCountrySchemeService } from 'src/app/services/vaccine-country-scheme.service';
import { VaccineCountryService } from 'src/app/services/vaccine-country.service';

/**
 * Component that lets the user create, update, delete or review vaccine centers
 */
@Component({
  selector: 'app-vaccine-center',
  templateUrl: './vaccine-center.component.html',
  styleUrls: ['./vaccine-center.component.css'],
})
export class VaccineCenterComponent implements OnInit {
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
   * ngModel for idCountry
   */
  idCountry: string = '';
  /**
   * ngModel for idVaccine_Center
   */
  idVaccine_Center: string = '';
  /**
   * ngModel for idVaccine
   */
  idVaccine: string = '';
  /**
   * ngModel for inStock
   */
  inStock: string = '';
  /**
   * ngModel for available
   */
  available: boolean = true;

  //Listas
  /**
   * List for country
   */
  countryList: Array<any> = [];
  /**
   * List for healthCenter
   */
  healthCenterList: Array<any> = [];
  /**
   * List for vaccine
   */
  vaccineList: Array<any> = [];
  /**
   * List for vaccine
   */
  vaccineListTemp: Array<any> = [];

  /**
   * List for vaccine
   */
  vaccineListExist: Array<any> = [];
  /**
   * List for vaccineCenter
   */
  vaccineCenterList: Array<any> = [];

  //Var
  /**
   * modal value for IdVaccineCenter
   */
  modalIdVaccineCenter: string = '';
  /**
   * modal value for IdVaccine
   */
  modalIdVaccine: string = '';
  /**
   * modal value for InStock
   */
  modalInStock: string = '';
  /**
   * modal value for available
   */
  modalAvailable: boolean = false;

  /**
   * Language used in the app
   */
  lang: string = 'en';
  /**
   * subscribes to language changes
   */
  langChange: Subscription | undefined;

  /**
   * Constructor for VaccineCenterComponent
   * @param permitsService Service used for filtering info according to the user permissions
   * @param countryService Service used to make requests to the backend
   * @param vaccineService Service used to make requests to the backend
   * @param healthCenterService Service used to make requests to the backend
   * @param vaccineCenterService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private permitsService: PermitsService,
    private countryService: CountryService,
    private vaccineService: VaccineService,
    private healthCenterService: HealthCenterService,
    private vaccineCenterService: VaccineCenterService,
    private vaccineCountryService: VaccineCountryService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private emitterService: EmittersService
  ) {}

  /**
   * Loads the required data used by the component
   */
  ngOnInit(): void {
    // Solicitar listado de paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.countryList = response.data;

          //Elimina los paises del listado si el usuario no es regional
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

          if (this.countryList.length == 0) {
            this.toastr.warning(
              this.translate.instant('VCENTER.NOCOUNTRIES'),
              this.translate.instant('VCENTER.MANAGEMENTS')
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('VCENTER.MANAGEMENTS'));
      }
    );

    //Validacion de permisos
    this.canReview = this.permitsService.validate(Functions.VCENTER_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.VCENTER_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.VCENTER_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.VCENTER_DELETE);

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
   * Updates the health centers associated to the country
   * @param id Id of the country
   */
  onChangeCountry(id: string) {
    this.idCountry = id;
    this.idVaccine_Center = '';
    this.idVaccine = '';
    this.inStock = '';
    this.available = true;
    this.vaccineCenterList = [];
    this.healthCenterList = [];
    this.vaccineList = [];
    this.getHealthCenterList();
    this.getVaccineCountryList();
  }

  /**
   * Gets the health centers of a country
   */
  private getVaccineCountryList() {
    this.vaccineCountryService.getVaccinesCountry(this.idCountry).subscribe(
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
   * Gets the health centers of a country
   */
  private getHealthCenterList() {
    this.healthCenterService.getHealthCenters(this.idCountry).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if (response.data.health_centers.length > 0) {
            this.healthCenterList = response.data.health_centers;
          } else {
            this.healthCenterList = [];
            this.toastr.warning(
              this.translate.instant('VCENTER.NOHCENTER'),
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
   * Load the list of health centers assigned to a country
   */
  onChangeHealthCenter(id: string) {
    this.idVaccine_Center = id;
    this.idVaccine = '';
    this.inStock = '';
    this.available = true;
    this.vaccineCenterList = [];
    this.getVaccineCenterList();
  }

  /**
   * Gets the health centers that a country has
   */
  private getVaccineCenterList() {
    this.vaccineCenterService.getVaccineCenter(this.idVaccine_Center).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if (response.data.vaccines.length > 0) {
            this.vaccineCenterList = response.data.vaccines;
            this.vaccineCenterList.forEach(
              (vc) => (vc.available = vc.available === 1)
            );
          } else {
            this.vaccineCenterList = [];
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

  /**
   * Saves a new vaccination point
   */
  onSave() {
    if (this.validar()) {
      let datos = new FormData();
      // datos.append('inStock', this.inStock);
      datos.append('idCountry', this.idCountry);
      datos.append('available', this.available ? '1' : '0');
      datos.append('idVaccine_Center', this.idVaccine_Center);
      datos.append('idVaccine', this.idVaccine);

      this.vaccineCenterService.postVaccineCenter(datos).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant('VCENTER.ADDVACCINE'),
              this.translate.instant('VCENTER.MANAGEMENTS')
            );
            this.getVaccineCenterList();
            this.clear();
          }
        },
        (error: any) => {
          this.toastr.error(
            error,
            this.translate.instant('VCENTER.MANAGEMENTS')
          );
        }
      );
    }
  }

  /**
   * Updates the modal data
   */
  setId(idVaccine: string) {
    this.modalIdVaccine = idVaccine;
    const tempVaccineCenter = this.vaccineCenterList.find(
      (element) => element.idVaccine == idVaccine
    );
    this.modalIdVaccineCenter = this.idVaccine_Center;
    this.modalInStock = tempVaccineCenter.inStock;
    this.modalAvailable = tempVaccineCenter.available;
  }

  /**
   * Updates the selected vaccine center
   */
  onUpdate() {
    let datos = new FormData();
    datos.append('idCountry', this.idCountry);
    datos.append('idVaccine_Center', this.modalIdVaccineCenter);
    datos.append('idVaccine', this.modalIdVaccine);
    // datos.append("inStock", this.modalInStock);
    datos.append('available', this.modalAvailable ? '1' : '0');

    this.vaccineCenterService.putVaccineCenter(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant('VCENTER.UPDATEVACCINE'),
            this.translate.instant('VCENTER.MANAGEMENTS')
          );
          this.getVaccineCenterList();
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('VCENTER.MANAGEMENTS'));
      }
    );
  }

  /**
   * Deletes a vaccine from a health center
   * @param idVaccine Id of the vaccine to remove from the health center
   */
  onDelete(idVaccine: string) {
    if (confirm(this.translate.instant('VCENTER.DELETEVACCINEQ'))) {
      this.vaccineCenterService
        .deleteVaccineCenter(this.idVaccine_Center, idVaccine)
        .subscribe(
          (response: any) => {
            if (response.statusCode == 200) {
              this.toastr.success(
                this.translate.instant('VCENTER.DELETEVACCINE'),
                this.translate.instant('VCENTER.MANAGEMENTS')
              );
              this.getVaccineCenterList();
            }
          },
          (error: any) => {
            this.toastr.error(
              error,
              this.translate.instant('VCENTER.MANAGEMENTS')
            );
          }
        );
    }
  }

  /**
   * Validates the data of the form
   * @returns True if the data from is correct
   */
  validar(): boolean {
    if (this.idCountry == '') {
      this.toastr.warning(
        this.translate.instant('VCENTER.SELECTCOUNTRYW'),
        this.translate.instant('VCENTER.MANAGEMENTS')
      );
      return false;
    }
    if (this.idVaccine_Center == '') {
      this.toastr.warning(
        this.translate.instant('VCENTER.SELECTHCENTERW'),
        this.translate.instant('VCENTER.MANAGEMENTS')
      );
      return false;
    }
    if (this.idVaccine == '') {
      this.toastr.warning(
        this.translate.instant('VCENTER.SELECTVACCINEW'),
        this.translate.instant('VCENTER.MANAGEMENTS')
      );
      return false;
    }
    // if(this.inStock == ''){
    //   this.toastr.warning(
    //     this.translate.instant("VCENTER.STOCKW"),
    //     this.translate.instant("VCENTER.MANAGEMENTS")
    //   );
    //   return false;
    // }
    return true;
  }

  /**
   * clears the data of the form
   */
  clear() {
    this.idVaccine = '';
    this.available = true;
    this.inStock = '';
    // this.idCountry = '';
    // this.idVaccine_Center = '';
  }
}
