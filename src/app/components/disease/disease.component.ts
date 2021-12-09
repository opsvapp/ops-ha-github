import { Component, OnDestroy, OnInit } from '@angular/core';
//Servicio de Enfermedades
import { DiseaseService } from '../../services/disease.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

/**
 * Table where the users will be able to see, create, update or delete the diseases
 */
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css'],
})
export class DiseaseComponent implements OnInit, OnDestroy {
  //ngModels
  /**
   * Name of the disease in english
   */
  nameEN = '';
  /**
   * Name of the disease in spanish
   */
  nameES = '';
  /**
   * Name of the disease in portuguese
   */
  namePT = '';
  /**
   * Name of the disease in french
   */
  nameFR = '';
  
  /**
   * Description of the disease in english
   */
  descriptionEN = '';
  /**
   * Description of the disease in spanish
   */
  descriptionES = '';
  /**
   * Description of the disease in portuguese
   */
  descriptionPT = '';
  /**
   * Description of the disease in french
   */
  descriptionFR = '';

  /**
   * Source of the information
   */
   source = '';

  //Modal ngModels
  /**
   * Current value of the modal related to  disease name in english
   */
  modalNameEN = '';
  /**
   * Current value of the modal related to  disease name in spanish
   */
  modalNameES = '';
  /**
   * Current value of the modal related to  disease name in portuguese
   */
  modalNamePT = '';
  /**
   * Current value of the modal related to  disease name in french
   */
  modalNameFR = '';

  /**
   * Current value of the modal related to  disease description in english
   */
  modalDescriptionEN = '';
  /**
   * Current value of the modal related to  disease description in spanish
   */
  modalDescriptionES = '';
  /**
   * Current value of the modal related to  disease description in portuguese
   */
  modalDescriptionPT = '';
  /**
   * Current value of the modal related to  disease description in french
   */
  modalDescriptionFR = '';

  /**
   * modal ngModel for Source
   */
   modalSource = '';

  //Var
  /**
   * List of current diseases
   */
  diseaseList: Array<any> = [];
  /**
   * Id of the selected disease
   */
  diseaseId: string = '';

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
   * Constructor for disease component
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param diseaseService Service used to make requests to the backend
   * @param permitsService Service used for filtering info according to the user permissions
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private toastr: ToastrService,
    private diseaseService: DiseaseService,
    private permitsService: PermitsService,
    public translate: TranslateService,
    private emitterService: EmittersService
  ) {}


  /**
    * Loads the required data used by the component
   */
  ngOnInit(): void {
    this.diseaseService.getDiseases().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.diseaseList = response.data;
          if (this.diseaseList.length == 0) {
            this.toastr.warning(
              this.translate.instant("DISEASE.NODISEASES"),
              this.translate.instant("DISEASE.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("DISEASE.MANAGEMENTS"));
      }
    );
    this.canReview = this.permitsService.validate(Functions.DISEASE_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.DISEASE_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.DISEASE_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.DISEASE_DELETE);

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
   * Sets the selected disease to de modal for update data
   */
  setDiseaseId(id: string) {
    this.diseaseId = id;
    this.diseaseService.getDisease(id).subscribe(
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
        this.modalSource = datos.source;
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("DISEASE.MANAGEMENTS"));
      }
    );
  }

  /**
   * Requests to the backend service to create a new disease
   */
  saveDisease() {
    if (this.validar()) {
      //Objeto
      let datos = new FormData();
      datos.append('name_EN', this.nameEN);
      datos.append('description_EN', this.descriptionEN);
      datos.append('name_ES', this.nameES);
      datos.append('description_ES', this.descriptionES);
      datos.append('name_PT', this.namePT);
      datos.append('description_PT', this.descriptionPT);
      datos.append('name_FR', this.nameFR);
      datos.append('description_FR', this.descriptionFR);
      datos.append('source', this.source);
      //Request
      this.diseaseService.createDisease(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant("DISEASE.SAVED"),
            this.translate.instant("DISEASE.MANAGEMENTS")
          );
          this.clear();
          this.ngOnInit();
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("DISEASE.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Requests to the backend service to update a disease with the selected id and data from the modal
   */
  updateDisease() {
    let datos = new FormData();
    datos.append('idDisease', this.diseaseId);
    datos.append('name_EN', this.modalNameEN);
    datos.append('description_EN', this.modalDescriptionEN);
    datos.append('name_ES', this.modalNameES);
    datos.append('description_ES', this.modalDescriptionES);
    datos.append('name_PT', this.modalNamePT);
    datos.append('description_PT', this.modalDescriptionPT);
    datos.append('name_FR', this.modalNameFR);
    datos.append('description_FR', this.modalDescriptionFR);
    datos.append('source', this.modalSource);
    this.diseaseService.updateDisease(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("DISEASE.UPDATED"),
            this.translate.instant("DISEASE.MANAGEMENTS")
          );
          this.ngOnInit();
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("DISEASE.MANAGEMENTS"));
      }
    );
  }

  /**
   * Requests to the backend service to delete a disease with the selected id
   */
  deleteDisease(id: string) {
    if (confirm(this.translate.instant("DISEASE.CONFIRMDELETE"))) {
      this.diseaseService.removeDisease(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("DISEASE.DELETED"),
              this.translate.instant("DISEASE.MANAGEMENTS")
            );
            this.ngOnInit();
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("DISEASE.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Validates if the data of the disease is correct
   */
  validar(): boolean {
    let val: number = 0;
    if (this.nameEN.trim().length > 0 && this.descriptionEN.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("DISEASE.CHECKENGLISH"),
        this.translate.instant("DISEASE.VALIDATION")
      );
    }

    if (this.nameES.trim().length > 0 && this.descriptionES.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("DISEASE.CHECKSPANISH"),
        this.translate.instant("DISEASE.VALIDATION")
      );
    }

    if (this.namePT.trim().length > 0 && this.descriptionPT.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("DISEASE.CHECKPORTUGUESE"),
        this.translate.instant("DISEASE.VALIDATION")
      );
    }

    if (this.nameFR.trim().length > 0 && this.descriptionFR.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("DISEASE.CHECKFRENCH"),
        this.translate.instant("DISEASE.VALIDATION")
      );
    }
    return val === 4 ? true : false;
  }

  /**
   * Cleans the data of the modal
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
    this.source = '';
  }
}
