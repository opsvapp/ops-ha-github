import { Component, OnDestroy, OnInit } from '@angular/core';
//Servicios
import { CountryService } from '../../services/country.service';
import { SchemesService } from '../../services/schemes.service';
import { VaccineService } from '../../services/vaccine.service';
import { VaccineCountrySchemeService } from '../../services/vaccine-country-scheme.service';
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
 * Component that allows the user to crate, update, delete and review vaccine-country data
 */
@Component({
  selector: 'app-vaccine-country',
  templateUrl: './vaccine-country.component.html',
  styleUrls: ['./vaccine-country.component.css'],
})
export class VaccineCountryComponent implements OnInit, OnDestroy {
  //ngModels
  /**
   * ngModel for countryId
   */
  countryId: string = '-1';
  /**
   * ngModel for schemeId
   */
  schemeId: string = '-1';

  //Listas
  /**
   * List for country
   */
  countryList: Array<any> = [];
  /**
   * List for scheme
   */
  schemeList: Array<any> = [];
  /**
   * List for vaccine
   */
  vaccineList: Array<any> = [];
    /**
   * List for vaccine
   */
     vaccineListTemp: Array<any> = [];
  /**
   * List for vaccine that exist in idCountry
   */
   vaccineListExist: Array<any> = [];
  /**
   * List for dataT
   */
  dataTable: any = {};

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
   * Indicates if the scheme is list only mode
   */
  listMode: boolean=false;


  /**
    * Language used in the app
   */
  lang: string = "en";
  /**
    * subscribes to language changes
    */
  langChange: Subscription | undefined;

  /**
   * Constructor for VaccineCountryComponent
   * @param countryService Service used to make requests to the backend 
   * @param schemeService  Service used to make requests to the backend
   * @param vaccineService  Service used to make requests to the backend
   * @param vcService  Service used to make requests to the backend
   * @param permitsService Service used for filtering info according to the user permissions
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   * @param vaccineCountryService Services used to get vaccines by country
   */
  constructor(
    private countryService: CountryService,
    private schemeService: SchemesService,
    private vaccineService: VaccineService,
    private vcService: VaccineCountrySchemeService,
    private permitsService: PermitsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private emitterService: EmittersService,
    private vaccineCountryService: VaccineCountryService
  ) {}
  /**
    * Loads the required data used by the component
   */
  ngOnInit(): void {
    //Listado General de Paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if (response.data.length > 0) {
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
          } else {
            this.countryList = [];
            this.toastr.warning(
              this.translate.instant("VACCINECOUNTRY.NOCOUNTRY"),
              this.translate.instant("VACCINECOUNTRY.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VACCINECOUNTRY.MANAGEMENTS"));
      }
    );
    //Listado General de Esquemas
    this.schemeService.getSchemes().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          if (response.data.length > 0) {
            this.schemeList = response.data;
          } else {
            this.schemeList = [];
            this.toastr.warning(
              this.translate.instant("VACCINECOUNTRY.NOSCHEME"),
              this.translate.instant("VACCINECOUNTRY.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VACCINECOUNTRY.MANAGEMENTS"));
      }
    );
    //Listado General de Vacunas
    // this.vaccineService.getVaccines().subscribe(
    //   (response: any) => {
    //     if (response.statusCode == 200) {
    //       if (response.data.length > 0) {
    //         this.vaccineList = response.data;
    //       } else {
    //         this.vaccineList = [];
    //         this.toastr.warning(
    //           this.translate.instant("VACCINECOUNTRY.NOVACCINES"),
    //           this.translate.instant("VACCINECOUNTRY.MANAGEMENTS")
    //         );
    //       }
    //     }
    //   },
    //   (error: any) => {
    //     this.toastr.error(error, this.translate.instant("VACCINECOUNTRY.MANAGEMENTS"));
    //   }
    // );
    //Permisos
    this.canReview = this.permitsService.validate(Functions.VCOUNTRY_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.VCOUNTRY_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.VCOUNTRY_UPDATE);

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
   * Creates a mew vaccine country
   */
  saveData() {
    if (confirm(this.translate.instant("VACCINECOUNTRY.CONFIRMCHANGES"))) {
      if (this.countryId != '-1' && this.schemeId != '-1') {
        let datos: any = {};
        datos['idCountry'] = this.countryId;
        datos['idScheme'] = this.schemeId;
        datos['info'] = this.dataTable;
        this.vcService.saveCountryScheme(datos).subscribe(
          (response: any) => {
            this.toastr.success(response.message, this.translate.instant("VACCINECOUNTRY.MANAGEMENTS"));
          },
          (error: any) => {
            this.toastr.error(error, this.translate.instant("VACCINECOUNTRY.MANAGEMENTS"));
          }
        );
      } else {
        this.toastr.warning(
          this.translate.instant("VACCINECOUNTRY.CHECKDATA"),
          this.translate.instant("VACCINECOUNTRY.MANAGEMENTS")
        );
      }
    } else {
      this.toastr.warning(
        this.translate.instant("VACCINECOUNTRY.ERROR"), 
        this.translate.instant("VACCINECOUNTRY.MANAGEMENTS")
      );
    }
  }

  /**
   * Request data from vaccine-country
   */
  loadData() {
    if (this.schemeId == '-1' || this.countryId == '-1') {
      this.toastr.warning(
        this.translate.instant("VACCINECOUNTRY.CHECKDATA"),
        this.translate.instant("VACCINECOUNTRY.MANAGEMENTS")
      );
    } else {
      this.vcService
        .getCountryVaccines(this.countryId, this.schemeId)
        .subscribe(
          (response: any) => {
            this.listMode = (response.data.listMode==1)?false:true;
            this.dataTable = { ...response.data.info };
            this.toastr.success(
              this.translate.instant("VACCINECOUNTRY.DATALOADED"), 
              this.translate.instant("VACCINECOUNTRY.MANAGEMENTS")
            );
          },
          (error: any) => {
            this.dataTable = {};
            this.toastr.error(error, this.translate.instant("VACCINECOUNTRY.MANAGEMENTS"));
          }
        );
    }
  }

  /**********************************
   ** Metodos para Manejo de Tabla **
   **********************************/

  /**
   * Add the vaccine to the ED
   * @param idVaccine ID of the vaccine to add
   */
  addVaccine(idVaccine: string) {
    if (this.dataTable[idVaccine] != undefined) {
      delete this.dataTable[idVaccine];
    } else {
      this.dataTable[idVaccine] = [
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
      ];
    }
  }

  /**
   * Change the state of the doses field
   * @param idVaccine vaccine ID
   * @param position Position inside the Array of the vaccine
   */
  addInfo(idVaccine: string, position: number) {
    this.dataTable[idVaccine][position] == '0'
      ? (this.dataTable[idVaccine][position] = '1')
      : (this.dataTable[idVaccine][position] = '0');
    console.table(this.dataTable);
  }

  /**
   * Add the value of Dose#Applymonths to the vaccine
   * @param idVaccine vaccine ID
   * @param position Position inside the vaccine
   * @param value Value of the months inside the vaccine
   */
  addInfoText(idVaccine: string, position: number, value: any) {
    this.dataTable[idVaccine][position] = value.target.value;
    console.table(this.dataTable);
  }

    /**
   * Updates the health centers associated to the country
   * @param id Id of the country
   */
     onChangeCountry(id: string) {
       this.countryId = id;
       this.getVaccineCountryList();
       //this.vaccineList
    }

    /**
   * Gets the health centers of a country
   */
     private getVaccineCountryList() {    
      this.vaccineCountryService.getVaccinesCountry(this.countryId).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            if(response.data.length>0){
              this.vaccineListExist = response.data;
              this.listarVacunas();
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

    private listarVacunas(){
      //Solicitar listado de vacunas
    
    this.vaccineService.getVaccines().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          
          this.vaccineList = response.data;
          this.vaccineList.forEach(vaccine=>{
            if(this.vaccineListExist.includes(vaccine.idVaccine)){
              this.vaccineListTemp.push(vaccine)
            }
          })

          this.vaccineList = this.vaccineListTemp;
          this.vaccineListTemp = [];

          if (this.vaccineList.length == 0) {          
            this.toastr.warning(
              this.translate.instant("VCENTER.NOVACCINES"),
              this.translate.instant("VCENTER.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("VCENTER.MANAGEMENTS"));
      }
    );
    }

  /**
   * Enable Checkbox.
   * @param idVaccine vaccine ID
   * @returns true if the vaccine exists in the ED
   */
  enableCheck(idVaccine: string): boolean {
    return this.dataTable[idVaccine] != undefined ? true : false;
  }

  /**
   * Check the checkbox
   * @param idVaccine vaccine ID
   * @param position Position inside the vaccine
   * @returns true if the dose is marked
   */
  markCheck(idVaccine: string, position: number): boolean {
    if (
      this.dataTable[idVaccine] != undefined &&
      this.dataTable[idVaccine][position] == '1'
    ) {
      return true;
    }
    return false;
  }

  /**
   * Sets the value of ApplyMonths
   * @param idVaccine vaccine ID
   * @param position Position inside the vaccine
   * @returns String with text value
   */
  newValue(idVaccine: string, position: number): string {
    if (this.dataTable[idVaccine] != undefined) {
      return this.dataTable[idVaccine][position];
    }
    return '';
  }

  /**
   * Enables the vaccine to modify your data on the table
   * @param idVaccine vaccine ID
   * @returns true if the vaccine exists in the ED
   */
  markVaccineCheck(idVaccine: string) {
    if (this.dataTable[idVaccine] != undefined) {
      return true;
    }
    return false;
  }
}
