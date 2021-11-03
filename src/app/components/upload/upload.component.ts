import { Component, OnInit ,ViewChild,  ElementRef } from '@angular/core';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
//Toastr
import { ToastrService } from 'ngx-toastr';
//Translate
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from '../../services/emitters/emitters.service';
import { CountryService } from '../../services/country.service';
//Upload Service
import { UploadService } from '../../services/upload.service';



/**
 * Component where the user will be able to upload files
 */
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  //ngModels
  /**
   * Country id that owns the data of the file
   */
  countryId: string = '-1';
  /**
   * File with schemes data
   */
  fileToUpload: any = File;
  //Listas
  /**
   * List of countries
   */
  countryList: Array<any> = [];
  //Translate
  /**
    * Language used in the app
   */
  lang: string = "en";
  /**
     * subscribes to language changes
     */
  langChange: Subscription | undefined;

  /**
  * Id for uploading the file
  */
  categoryId: string = '0';

  /**
 * Id for uploading the file
 */
  catcountryId: string = '6';

  /**
   * Reference for input file
   */
   @ViewChild('myInput')
   myInputVariable: ElementRef | undefined;
 


  /**
   * Constructor of UploadComponent
   * @param permitsService Service used for filtering info according to the user permissions
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   * @param countryService Service used to make requests to the backend
   * @param uploadService Service used to make requests to the backend
   */
  constructor(
    private permitsService: PermitsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private emitterService: EmittersService,
    private countryService: CountryService,
    private uploadService: UploadService
  ) { }

  /**
   * Loads the data required by the component
   */
  ngOnInit(): void {
    //Cargar listado de paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
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
   * Loads the file
   */
  upload() {
    if (this.validate()) {
      
      let datos = new FormData();
      datos.append('idCountry', this.countryId);
      datos.append('file', this.fileToUpload);
      if (this.myInputVariable) {
        this.myInputVariable.nativeElement.value = "";
        this.fileToUpload=File;
      }
      switch (this.categoryId) {
        case '1':
          this.uploadService.uploadFileVaccineCountry(datos).subscribe(
            (response: any) => {
              this.toastr.success(
                this.translate.instant('UPLOAD.SUCCESS'),
                this.translate.instant('UPLOAD.TITLE')
              );
            },
            (error: any) => {
              this.toastr.error(error, this.translate.instant('UPLOAD.TITLE'));
              if (this.myInputVariable) {
                this.myInputVariable.nativeElement.value = "";
                this.fileToUpload=File;
              }
            }
          );
          break;

        case '2':
          this.uploadService.uploadFileDisease(datos).subscribe(
            (response: any) => {
              this.toastr.success(
                this.translate.instant('UPLOAD.SUCCESS'),
                this.translate.instant('UPLOAD.TITLE')
              );
            },
            (error: any) => {
              this.toastr.error(error, this.translate.instant('UPLOAD.TITLE'));
              if (this.myInputVariable) {
                this.myInputVariable.nativeElement.value = "";
                this.fileToUpload=File;
              }
            }
          );
          break;

        case '3':
          this.uploadService.uploadFileScheme(datos).subscribe(
            (response: any) => {
              this.toastr.success(
                this.translate.instant('UPLOAD.SUCCESS'),
                this.translate.instant('UPLOAD.TITLE')
              );
            },
            (error: any) => {
              this.toastr.error(error, this.translate.instant('UPLOAD.TITLE'));
              if (this.myInputVariable) {
                this.myInputVariable.nativeElement.value = "";
                this.fileToUpload=File;
              }
            }
          );
          break;

        case '4':
          this.uploadService.uploadFileHealthCenter(datos).subscribe(
            (response: any) => {
              this.toastr.success(
                this.translate.instant('UPLOAD.SUCCESS'),
                this.translate.instant('UPLOAD.TITLE')
              );
            },
            (error: any) => {
              this.toastr.error(error, this.translate.instant('UPLOAD.TITLE'));
              if (this.myInputVariable) {
                this.myInputVariable.nativeElement.value = "";
                this.fileToUpload=File;
              }
            }
          );
          break;

        case '5':
            this.uploadService.uploadFileVaccinationPoint(datos).subscribe(
              (response: any) => {
                this.toastr.success(
                  this.translate.instant('UPLOAD.SUCCESS'),
                  this.translate.instant('UPLOAD.TITLE')
                );
              },
              (error: any) => {
                this.toastr.error(error, this.translate.instant('UPLOAD.TITLE'));
                if (this.myInputVariable) {
                  this.myInputVariable.nativeElement.value = "";
                  this.fileToUpload=File;
                }
              }
            );
            break;

        case '6':
          this.uploadService.uploadFile(datos).subscribe(
            (response: any) => {
              this.toastr.success(
                this.translate.instant('UPLOAD.SUCCESS'),
                this.translate.instant('UPLOAD.TITLE')
              );
            },
            (error: any) => {
              this.toastr.error(error, this.translate.instant('UPLOAD.TITLE'));
              if (this.myInputVariable) {
                this.myInputVariable.nativeElement.value = "";
                this.fileToUpload=File;
              }
            }
          );
          break;
      }

    }
  }

  /**
   * Handles file input
   * @param event Event of uploading a file
   */
  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  /**
   * Validates if the form is valid
   * @returns True if the form is valid
   */
  validate() {
    let valid: number = 0;
    if (this.fileToUpload) {
      if (this.fileToUpload.size > 0) {
        valid += 1;
      } else {
        this.toastr.warning(
          this.translate.instant('UPLOAD.EMPTY_FILE'),
          this.translate.instant('UPLOAD.TITLE')
        );
      }
    } else {
      this.toastr.warning(
        this.translate.instant('UPLOAD.EMPTY_FILE'),
        this.translate.instant('UPLOAD.TITLE')
      );
    }
    if (this.categoryId == '6') {
      if (this.countryId != '-1') {
        valid += 1;
      } else {
        this.toastr.warning(
          this.translate.instant('UPLOAD.EMPTY_COUNTRY'),
          this.translate.instant('UPLOAD.TITLE')
        );
      }
    }
    else {
      valid += 1;
    }

    return valid === 2 ? true : false;
  }

  downloadFileDisease(){
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/prototypes/disease.xlsx';
    link.download = "disease.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
}

  downloadFileScheme() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/prototypes/scheme.xlsx';
    link.download = "scheme.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadFileVaccinationPoint() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/prototypes/vaccination point.xlsx';
    link.download = "vaccination point.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadFileVaccine() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/prototypes/vaccine.xlsx';
    link.download = "vaccine.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadFileHealthCenter() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/prototypes/health center.xlsx';
    link.download = "health center.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadFileVaccinationScheme() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/prototypes/scheme example.xlsx';
    link.download = "scheme example.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
