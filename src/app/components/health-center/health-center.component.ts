import { Component, OnDestroy, OnInit } from '@angular/core';
//Servicios de peticiones
import { CountryService } from '../../services/country.service';
//Toastr
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { HealthCenterService } from '../../services/health-center.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

/**
 * Table where the users will be able to see, create, update or delete the health centers
 */
@Component({
  selector: 'app-health-center',
  templateUrl: './health-center.component.html',
  styleUrls: ['./health-center.component.css']
})
export class HealthCenterComponent implements OnInit, OnDestroy {
  //ngModels
  /**
   * Id of the country that the health center belongs to
   */
  idCountry: string = '';
  /**
   * Name of the health center in english
   */
  name_EN: string = '';
  /**
   * Name of the health center in spanish
   */
  name_ES: string = '';
  /**
   * Name of the health center in portuguese
   */
  name_PT: string = '';
  /**
   * Name of the health center in french
   */
  name_FR: string = '';
  /**
   * Health center address
   */
  address: string = '';
  /**
   * Health center schedule
   */
  schedule: string = '';
  /**
   * Health center phone number
   */
  phone: string = '';

  /**
   * List of countries that the user can review
   */
  countryList: Array<any> = [];
  /**
   * Health centers list of the selected country 
   */
  healthCenterList: Array<any> = [];

  /**
   * Id of the selected country
   */
  modalIdCountry: string = '';
  /**
   * Id of the selected vaccine center
   */
  modalIdVaccineCenter: string = '';
  /**
   * Current value of the modal for the Name of the health center in english
   */
  modalName_EN: string = '';
  /**
   * Current value of the modal for the Name of the health center in spanish
   */
  modalName_ES: string = '';
  /**
   * Current value of the modal for the Name of the health center in portuguese
   */
  modalName_PT: string = '';
  /**
   * Current value of the modal for the Name of the health center in french
   */
  modalName_FR: string = '';
  /**
   * Current value of the modal for the Health center address
   */
  modalAddress: string = '';
  /**
   * Current value of the modal for the Health center schedule
   */
  modalSchedule: string = '';
  /**
   * Current value of the modal for the Health center phone number
   */
  modalPhone: string = '';

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
   * Page number
   */
  p: number = 1;

  /**
   * Constructor for health-center component
   * @param permitsService Service used for filtering info according to the user permissions
   * @param countryService Service used to make requests to the backend
   * @param healthCenterService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private permitsService: PermitsService,
    private countryService: CountryService,
    private healthCenterService: HealthCenterService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private emitterService: EmittersService
  ) { }

  /**
    * Calls the backend to fill the data and locks the functions that the user doest have permission to use
   */
  ngOnInit(): void {
    // Solicitar listado de paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.countryList = response.data;

          let indice = this.countryList.findIndex(
            (element) => element.idCountry == 1
          );
          this.countryList.splice(indice, 1);

        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("HEALTHCENTER.MANAGEMENTS"));
      }
    );


    //Validacion de permisos
    this.canReview = this.permitsService.validate(Functions.HCENTER_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.HCENTER_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.HCENTER_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.HCENTER_DELETE);

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
   * Loads the list of the health centers assigned to a country
   * @param id id of the country 
   */
  onChangeCountry(id: string) {
    this.idCountry = id;
    this.getHealthCenterList();
  }

  /**
   * Gets all the health centers from a country
   */
  private getHealthCenterList() {
    this.healthCenterService.getHealthCenters(this.idCountry).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if(response.data.health_centers.length>0){
            this.healthCenterList = response.data.health_centers;
          }else{
            this.healthCenterList =[];
            this.toastr.warning(
              this.translate.instant("HEALTHCENTER.HCNOTFOUND"),
              this.translate.instant("HEALTHCENTER.MANAGEMENTS")
            )
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("HEALTHCENTER.MANAGEMENTS"));
      }
    );
  }

  /**
   * Creates a new health center
   */
  onSave(){
    if(this.validar()){
      let datos = new FormData();
      datos.append('idCountry', this.idCountry);
      datos.append('name_EN', this.name_EN);
      datos.append('name_ES', this.name_ES);
      datos.append('name_PT', this.name_PT);
      datos.append('name_FR', this.name_FR);
      datos.append('address', this.address);
      datos.append('schedule', this.schedule);
      datos.append('phone', this.phone);

      this.healthCenterService.postHealthCenter(datos).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("HEALTHCENTER.HCCREATED"),
              this.translate.instant("HEALTHCENTER.MANAGEMENTS")
            );
            this.getHealthCenterList();
            this.clear();
          }
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("HEALTHCENTER.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Shos the info of the requested health center into the modal
   * @param id id of the health center
   */
  setId(id: string){
    this.modalIdVaccineCenter = id;
    const tempHealthCenter = this.healthCenterList.find(
      (element) => element.idVaccine_Center == id
    );
    this.modalIdCountry = tempHealthCenter.idCountry;
    this.modalName_EN = tempHealthCenter.name_EN;
    this.modalName_ES = tempHealthCenter.name_ES;
    this.modalName_PT = tempHealthCenter.name_PT;
    this.modalName_FR = tempHealthCenter.name_FR;
    this.modalAddress = tempHealthCenter.address;
    this.modalSchedule = tempHealthCenter.schedule;
    this.modalPhone = tempHealthCenter.phone;
  }

  /**
   * Updates a health center
   */
  onUpdate(){
    let datos = new FormData();
    datos.append('idCountry', this.modalIdCountry);
    datos.append('idVaccine_Center', this.modalIdVaccineCenter);
    datos.append('name_EN', this.modalName_EN);
    datos.append('name_ES', this.modalName_ES);
    datos.append('name_PT', this.modalName_PT);
    datos.append('name_FR', this.modalName_FR);
    datos.append('address', this.modalAddress);
    datos.append('schedule', this.modalSchedule);
    datos.append('phone', this.modalPhone);

    this.healthCenterService.putHealthCenter(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("HEALTHCENTER.HCUPDATED"),
            this.translate.instant("HEALTHCENTER.MANAGEMENTS")
          );
          this.getHealthCenterList();
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("HEALTHCENTER.MANAGEMENTS"));
      }
    );

  }

  /**
   * Requests to the backend service to delete a health center with the selected id
   * @param id ID of hte health center to delete
   */
  onDelete(id: string){
    if (confirm(this.translate.instant("HEALTHCENTER.CONFIRMDELETE"))) {
      this.healthCenterService
        .deleteHealthCenter(id)
        .subscribe(
          (response: any) => {
            if (response.statusCode == 200) {
              this.toastr.success(
                this.translate.instant("HEALTHCENTER.HCDELETED"), 
                this.translate.instant("HEALTHCENTER.MANAGEMENTS")
                );
              this.getHealthCenterList();
            }
          },
          (error: any) => {
            this.toastr.error(error, this.translate.instant("HEALTHCENTER.MANAGEMENTS"));
          }
        );
    }
  }

  /**
   * Validates if the data of the disease is correct
   */
  validar():boolean{
    if(this.idCountry == ''){
      this.toastr.warning(
        this.translate.instant("HEALTHCENTER.SELECTCOUNTRY"),
        this.translate.instant("HEALTHCENTER.MANAGEMENTS")
      );
      return false;
    }

    if(this.address == ''){
      this.toastr.warning(
        this.translate.instant("HEALTHCENTER.SELECTADDRESS"),
        this.translate.instant("HEALTHCENTER.MANAGEMENTS")
      );
      return false;
    }

    if(this.schedule == ''){
      this.toastr.warning(
        this.translate.instant("HEALTHCENTER.SELECTSCHEDULE"),
        this.translate.instant("HEALTHCENTER.MANAGEMENTS")
      );
      return false;
    }

    if(this.phone == ''){
      this.toastr.warning(
        this.translate.instant("HEALTHCENTER.SELECTPHONE"),
        this.translate.instant("HEALTHCENTER.MANAGEMENTS")
      );
      return false;
    }

    return true;
  }

  /**
   * Cleans the data of the modal
   */
  clear():void{
    this.name_EN = '';
    this.name_ES = '';
    this.name_PT = '';
    this.name_FR = '';
    this.address = '';
    this.schedule = '';
    this.phone = '';
  }

}
