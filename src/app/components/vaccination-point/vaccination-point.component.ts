import { Component, OnDestroy, OnInit } from '@angular/core';
//Servicio de Enfermedades
import { CountryService } from '../../services/country.service';
import { VaccinationPointService } from '../../services/vaccination-point.service';
import { VaccineService } from '../../services/vaccine.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { TranslateService } from '@ngx-translate/core';
import { EmittersService } from '../../services/emitters/emitters.service';
import { Subscription } from 'rxjs';
import { VaccineCountryService } from 'src/app/services/vaccine-country.service';
import { wifi } from 'ngx-bootstrap-icons';

/**
 * Table where the user can create, update, delete and review vaccination points
 */
@Component({
  selector: 'app-vaccination-point',
  templateUrl: './vaccination-point.component.html',
  styleUrls: ['./vaccination-point.component.css'],
})
export class VaccinationPointComponent implements OnInit, OnDestroy {
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
   * ngModel for countryId
   */
  countryId: string = '';
  /**
   * ngModel for adminOneId
   */
  adminOneId: string = '';
  /**
   * ngModel for adminTwoId
   */
  adminTwoId: string = '';
  /**
   * ngModel for vaccinationPoint
   */
  vaccinationPoint: string = '';
  /**
   * ngModel for vaccineId
   */
  vaccineId: string = '';
  /**
   * ngModel for nameEN
   */
  nameEN: string = '';
  /**
   * ngModel for nameES
   */
  nameES: string = '';
  /**
   * ngModel for namePT
   */
  namePT: string = '';
  /**
   * ngModel for nameFR
   */
  nameFR: string = '';
  /**
   * ngModel for address
   */
  address: string = '';
  /**
   * ngModel for schedule
   */
  schedule: string = '';
  /**
   * ngModel for phone
   */
  phone: string = '';
  /**
   * ngModel for inStock
   */
  inStock: string = '';
  /**
   * ngModel for available
   */
  available: boolean = true; // 1
  
  //Lists
  /**
   * List for country
   */
  countryList: Array<any> = [];
  /**
   * List for adminOne
   */
  adminOneList: Array<any> = [];
  /**
   * List for adminTwo
   */
  adminTwoList: Array<any> = [];
  /**
   * List for vaccinationPoint
   */
  vaccinationPointList: Array<any> = [];
  /**
   * List for vaccinePoint
   */
  vaccinePointList: Array<any> = [];
  /**
   * List for vaccine
   */
  vaccineList: Array<any> = [];
/**
   * List for vaccine
   */
 vaccineListExist: Array<any> = [];
  /**
   * List for vaccines temp
   */
 vaccineListTemp: Array<any> = [];
  /**
   * Modal value for IdVaccinationPoint
   */
  modalIdVaccinationPoint: string = '';
  /**
   * Modal value for Name_EN
   */
  modalName_EN: string = '';
  /**
   * Modal value for Name_ES
   */
  modalName_ES: string = '';
  /**
   * Modal value for Name_PT
   */
  modalName_PT: string = '';
  /**
   * Modal value for Name_FR
   */
  modalName_FR: string = '';
  /**
   * Modal value for Address
   */
  modalAddress: string = '';
  /**
   * Modal value for Schedule
   */
  modalSchedule: string = '';
  /**
   * Modal value for Phone
   */
  modalPhone: string = '';
  /**
   * Modal value for IdVaccine
   */
  modalIdVaccine: string = '';
  /**
   * Modal value for InStock
   */
  modalInStock: string = '';
  /**
   * Modal value for available
   */
  modalAvailable: boolean = false; // 0

  /**
    * Language used in the app
   */
  lang: string = "en";
  /**
     * subscribes to language changes
     */
  langChange: Subscription | undefined;

  /**
   * Constructor for vaccination point
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param countryService Service used to make requests to the backend
   * @param permitsService Service used for filtering info according to the user permissions
   * @param vPointService Service used to make requests to the backend
   * @param vaccineService Service used to make requests to the backend
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private toastr: ToastrService,
    private countryService: CountryService,
    private permitsService: PermitsService,
    private vPointService: VaccinationPointService,
    private vaccineService: VaccineService,
    private translate: TranslateService,
    private emitterService: EmittersService,
    private vaccineCountryService:VaccineCountryService
  ) {}

  /**
   * Loads the necessary data that the component requires
   */
  ngOnInit(): void {
    this.getCountries();
    //this.getVaccines();

    //Validacion de permisos
    this.canReview = this.permitsService.validate(Functions.VPOINT_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.VPOINT_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.VPOINT_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.VPOINT_DELETE);

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
   * Request the existing countries
   */
  getCountries(){
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.data.length > 0) {
          this.countryList = response.data;
          this.countryId = '-1';
          this.adminOneId = '-1';
          this.adminTwoId = '-1';
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';

          let indice = this.countryList.findIndex(
            (element) => element.idCountry == 1
          );
          this.countryList.splice(indice, 1);

        } else {
          this.countryList = [];
          this.adminOneList = [];
          this.adminTwoList = [];
          this.vaccinationPointList = [];
          this.vaccinePointList = [];
          this.countryId = '-1';
          this.adminOneId = '-1';
          this.adminTwoId = '-1';
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';
          this.toastr.warning(
            this.translate.instant("VPOINT.NORECORDS"),
            this.translate.instant("VPOINT.MANAGEMENTS")
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * Requests the existing vaccines
   */
  getVaccines(){
    this.vaccineListTemp = []
    this.vaccineList = []
    this.vaccineService.getVaccines().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.vaccineList = response.data;
          this.vaccineList.forEach(vaccine=>{
            if(this.vaccineListExist.includes(vaccine.idVaccine)){
              this.vaccineListTemp.push(vaccine)
            }
          })
          //console.log(this.vaccineListTemp)
          this.vaccineList = this.vaccineListTemp;
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * Requests the existing administrations 1
   */
  getAdminOneList() {
    this.countryService.getAllAdminOne(this.countryId).subscribe(
      (response: any) => {
        if (response.data.admins_1.length > 0) {
          this.adminOneList = response.data.admins_1;
          this.adminTwoId = '-1';
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';
        } else {
          this.adminOneList = [];
          this.adminTwoList = [];
          this.vaccinationPointList = [];
          this.vaccinePointList = [];
          this.adminOneId = '-1';
          this.adminTwoId = '-1';
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';
          this.toastr.warning(
            this.translate.instant("VPOINT.NOADMIN1"),
            this.translate.instant("VPOINT.MANAGEMENTS")
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * Requests the existing administrations 2
   */
  getAdminTwoList() {
    this.countryService.getAllAdminTwo(this.adminOneId).subscribe(
      (response: any) => {
        if (response.data.admins_2.length > 0) {
          this.adminTwoList = response.data.admins_2;
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';
        } else {
          this.adminTwoList = [];
          this.vaccinationPointList = [];
          this.vaccinePointList = [];
          this.adminTwoId = '-1';
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';
          this.toastr.warning(
            this.translate.instant("VPOINT.NOADMIN2"),
            this.translate.instant("VPOINT.MANAGEMENTS")
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * On country change updates the administrations lists
   */
  onCountryChange() {
    this.vaccinationPointList = [];
    this.vaccinePointList = [];
    this.getVaccineCountryList();
    //alert("HOLA :V")

    if (this.countryId != '-1') {
      this.getAdminOneList();
    } else {
      this.adminOneId = '-1';
      this.adminTwoId = '-1';
      this.vaccinationPoint = '-1';
      this.vaccineId = '-1';
    }
  }

   /**
   * Gets the health centers of a country
   */
    private getVaccineCountryList() {    
      this.vaccineCountryService.getVaccinesCountry(this.countryId).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            if(response.data.length>0){
              //console.log(response.data)
               this.vaccineListExist = response.data;
               this.getVaccines();
            }else{
              this.vaccineList =[];
              this.toastr.warning(this.translate.instant("VCENTER.NOHVACCINES"), this.translate.instant("VCENTER.MANAGEMENTS"))
            }
          }
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("VCENTER.MANAGEMENTS"));
        }
      );
    }

  /**
   * On administration 1 change updates the administration 2 list
   */
  onAdminOneChange() {
    this.vaccinationPointList = [];
    this.vaccinePointList = [];

    if (this.adminOneId != '-1') {
      this.getAdminTwoList();
    } else {
      this.adminTwoId = '-1';
      this.vaccinationPoint = '-1';
      this.vaccineId = '-1';
    }
  }

  /**
   * on Administration two change, updates the vaccination point list
   */
  onAdminTwoChange() {
    this.vaccinationPointList = [];
    this.vaccinePointList = [];

    if (this.adminTwoId != '-1') {
      this.getVaccinationPoints();
    } else {
      this.vaccinationPoint = '-1';
      this.vaccineId = '-1';
    }
  }

  /**
   * Request a list of vaccination points
   */
  getVaccinationPoints() {
    this.vPointService.getVaccinationPoints(this.adminTwoId).subscribe(
      (response: any) => {
        if (response.data.vaccination_points.length > 0) {
          this.vaccinationPointList = response.data.vaccination_points;
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';
        } else {
          this.vaccinationPointList = [];
          this.vaccinePointList = [];
          this.vaccinationPoint = '-1';
          this.vaccineId = '-1';
          this.toastr.warning(
            this.translate.instant("VPOINT.NOVPINT"),
            this.translate.instant("VPOINT.MANAGEMENTS")
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * On vaccination point change, updates the list of vaccines
   */
  onVaccinationPointChange() {
    this.vaccinePointList = [];

    if (this.vaccinationPoint != '-1') {
      this.getVaccinePoints();
    } else {
      this.vaccineId = '-1';
    }
  }

  /**
   * Request the list of vaccines associated with the vaccination point
   */
  getVaccinePoints() {
    this.vPointService.getVaccinePoints(this.vaccinationPoint).subscribe(
      (response: any) => {
        if (response.data.vaccines.length > 0) {
          this.vaccinePointList = response.data.vaccines;
          this.vaccinePointList.forEach(vp => vp.available = vp.available === 1);
          //console.log(this.vaccinePointList)
          this.vaccineId = '-1';
        } else {
          this.vaccinePointList = [];
          this.vaccineId = '-1';
          this.toastr.warning(
            this.translate.instant("VPOINT.NOVACCINES"),
            this.translate.instant("VPOINT.MANAGEMENTS")
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * Saves a new vaccination point
   */
  onSave(){
    if(this.validarVaccination()){
      let datos = new FormData();
      datos.append('name_EN', this.nameEN);
      datos.append('name_ES', this.nameES);
      datos.append('name_PT', this.namePT);
      datos.append('name_FR', this.nameFR);
      datos.append('address', this.address);
      datos.append('schedule', this.schedule);
      datos.append('phone', this.phone);
      datos.append('idCountry', this.countryId);
      datos.append('idAdmin_1', this.adminOneId);
      datos.append('idAdmin_2', this.adminTwoId);

      this.vPointService.createVaccinePoint(datos).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("VPOINT.VPOINTCREATE"),
              this.translate.instant("VPOINT.MANAGEMENTS")
            );
            this.getVaccinationPoints();
            this.clear();
          }
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Loads the data of the vaccination point that will be edited
   * @param id Id of the vaccination point
   */
  setIdVaccination(id: string){
    this.modalIdVaccinationPoint= id;
    const tempVaccination = this.vaccinationPointList.find(
      (element) => element.idVaccination_Point == id
    );
    this.modalName_EN = tempVaccination.name_EN;
    this.modalName_ES = tempVaccination.name_ES;
    this.modalName_PT = tempVaccination.name_PT;
    this.modalName_FR = tempVaccination.name_FR;
    this.modalAddress = tempVaccination.address;
    this.modalSchedule = tempVaccination.schedule;
    this.modalPhone = tempVaccination.phone;
  }

  /**
   * Updates the indicated vaccination point
   */
  onUpdateVaccination(){
    let datos = new FormData();
    datos.append('idVaccination_Point', this.modalIdVaccinationPoint);
    datos.append('name_EN', this.modalName_EN);
    datos.append('name_ES', this.modalName_ES);
    datos.append('name_PT', this.modalName_PT);
    datos.append('name_FR', this.modalName_FR);
    datos.append('address', this.modalAddress);
    datos.append('schedule', this.modalSchedule);
    datos.append('phone', this.modalPhone);
    datos.append('idCountry', this.countryId);
    datos.append('idAdmin_1', this.adminOneId);
    datos.append('idAdmin_2', this.adminTwoId);

    this.vPointService.updateVaccinePoint(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("VPOINT.VPOINTUPDATE"),
            this.translate.instant("VPOINT.MANAGEMENTS")
          );
          this.getVaccinationPoints();
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * Deletes a vaccination point
   * @param id Vaccination point that will be deleted
   */
  onDelete(id: string) {
    if (confirm(this.translate.instant("VPOINT.VPOINTDELETEQ"))) {
      this.vPointService.deleteVaccinePoint(id).subscribe(
        (response:any) => {
          if (response.statusCode==200) {
            this.toastr.success(
              this.translate.instant("VPOINT.VPOINTDELETE"),
              this.translate.instant("VPOINT.MANAGEMENTS"));
            this.getVaccinationPoints();
          }
        },
        (error:any) => {
          this.toastr.error(error,this.translate.instant("VPOINT.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Validates a new vaccination point
   * @returns True if the vaccination point is valid
   */
  validarVaccination(){
    if(this.countryId == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTCOUNTRY"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.adminOneId == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTADMIN1"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.adminTwoId == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTADMIN2"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.address == ''){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTADDRESS"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.phone == ''){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTPHONE"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.schedule == ''){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTSCHEDULE"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    return true;
  }

  /**
   * Clears the data of the form
   */
  clear(){
    this.nameEN = '';
    this.nameES = '';
    this.namePT = '';
    this.nameFR = '';
    this.address = '';
    this.schedule = '';
    this.phone = '';
  }
  
  /**
   * Saves a new vaccine associated to a vaccination point
   */
  onSaveVaccine(){
    if(this.validarVaccine()){
      let datos = new FormData();
      // datos.append('inStock', this.inStock);
      datos.append('available', this.available ? "1" : "0");
      datos.append('idVaccine', this.vaccineId);
      datos.append('idVaccination_Point', this.vaccinationPoint);

      this.vPointService.createVaccine(datos).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("VPOINT.ADDVACCINE"),
              this.translate.instant("VPOINT.MANAGEMENTS")
            );
            this.getVaccinePoints();
            this.clearVaccine();
          }
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Updates the id of the selected vaccine
   * @param id Id of the selected vaccine
   */
  setIdVaccine(id: string){
    this.modalIdVaccine= id;
    const tempVaccine = this.vaccinePointList.find(
      (element) => element.idVaccine == id
    );
    this.modalInStock = tempVaccine.inStock;
    this.modalAvailable = tempVaccine.available;
  }

  /**
   * Handles the update of a vaccine
   */
  onUpdateVaccine(){
    let datos = new FormData();
    // datos.append('inStock', this.modalInStock);
    datos.append('available', this.modalAvailable ? "1" : "0");
    datos.append('idVaccine', this.modalIdVaccine);
    datos.append('idVaccination_Point', this.vaccinationPoint);

    this.vPointService.updateVaccine(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("VPOINT.UPDATEVACCINE"),
            this.translate.instant("VPOINT.MANAGEMENTS")
          );
          this.getVaccinePoints();
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VPOINT.MANAGEMENTS"));
      }
    );
  }

  /**
   * Handles the delete of a vaccine on vaccine-point
   * @param id ID of the Vaccine that will be removed from the vaccination point
   */
  onDeleteVaccine(id: string){
    if (confirm(this.translate.instant("VPOINT.DELETEVACCINEQ"),)) {
      this.vPointService.deleteVaccine(this.vaccinationPoint,id).subscribe(
        (response:any) => {
          if (response.statusCode==200) {
            this.toastr.success(
              this.translate.instant("VPOINT.DELETEVACCINE"),
              this.translate.instant("VPOINT.MANAGEMENTS"));
            this.getVaccinePoints();
          }
        },
        (error:any) => {
          this.toastr.error(error,this.translate.instant("VPOINT.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Validates the texts of the form
   * @returns True if the form is valid
   */
  validarVaccine(){
    if(this.countryId == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTCOUNTRY"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.adminOneId == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTADMIN1"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.adminTwoId == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTADMIN2"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.vaccinationPoint == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTVPOINT"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    if(this.vaccineId == '-1'){
      this.toastr.warning(
        this.translate.instant("VPOINT.SELECTVACCINE"),
        this.translate.instant("VPOINT.MANAGEMENTS")
      );
      return false;
    }

    // if(this.inStock == ''){
    //   this.toastr.warning(
    //     this.translate.instant("VPOINT.SELECTSTOCK"),
    //     this.translate.instant("VPOINT.MANAGEMENTS")
    //   );
    //   return false;
    // }

    return true;
  }

  /**
   * Clears the values of the form 
   */
  clearVaccine(){
    this.vaccineId = '-1';
    this.inStock = '';
    this.available = true;
  }
}
