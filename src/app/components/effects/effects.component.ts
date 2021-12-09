import { Component, OnDestroy, OnInit } from '@angular/core';
//Servicio de Efectos Secundarios
import { EffectsService } from '../../services/effects.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
/**
 * Table where the users will be able to see, create, update or delete the effects
 */
@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.css'],
})
export class EffectsComponent implements OnInit, OnDestroy {
  
  //ngModels
  /**
   * Name of the secondary effect in english
   */
  nameEN = '';
  /**
   * Name of the secondary effect in spanish
   */
  nameES = '';
  /**
   * Name of the secondary effect in portuguese
   */
  namePT = '';
  /**
   * Name of the secondary effect in french
   */
  nameFR = '';

  /**
   * Description of the secondary effect in english
   */
  descriptionPT = '';
  /**
   * Description of the secondary effect in spanish
   */
  descriptionEN = '';
  /**
   * Description of the secondary effect in portuguese
   */
  descriptionES = '';
  /**
   * Description of the secondary effect in french
   */
  descriptionFR = '';

  /**
   * source of the information
   */
   source = '';

  //Modal ngModels
  /**
   * Modal value of the name of the secondary effect in english
   */
  modalNameEN = '';
  /**
   * Modal value of the name of the secondary effect in english
   */
  modalNameES = '';
  /**
   * Modal value of the name of the secondary effect in english
   */
  modalNamePT = '';
  /**
   * Modal value of the name of the secondary effect in english
   */
  modalNameFR = '';

  /**
   * Modal value of the description of the secondary effect in english
   */
  modalDescriptionEN = '';
  /**
   * Modal value of the description of the secondary effect in english
   */
  modalDescriptionES = '';
  /**
   * Modal value of the description of the secondary effect in english
   */
  modalDescriptionPT = '';
  /**
   * Modal value of the description of the secondary effect in english
   */
  modalDescriptionFR = '';

  /**
   * modal ngModel for Source
   */
   modalSource = '';

  //Var
  /**
   * List of current secondary effects
   */
  effectList: Array<any> = [];
  /**
   * Id of the selected secondary effect
   */
  effectId: string = '';

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
   * Constructor for effects component
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param effectsService Service used to make requests to the backend
   * @param permitsService Service used for filtering info according to the user permissions
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private toastr: ToastrService,
    private effectsService: EffectsService,
    private permitsService: PermitsService,
    private translate: TranslateService,
    private emitterService: EmittersService
  ) {}

  /**
    * Calls the backend to fill the data and locks the functions that the user doest have permission to use
   */
  ngOnInit(): void {
    this.effectsService.getEffects().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.effectList = response.data;
          if (this.effectList.length == 0) {
            this.toastr.warning(
              this.translate.instant("EFFECTS.NOEFFECTS"),
              this.translate.instant("EFFECTS.MANAGEMENTS")
            );
          }
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant("EFFECTS.MANAGEMENTS"));
      }
    );
    this.canReview = this.permitsService.validate(Functions.EFFECTS_REVIEW);
    this.canCreate = this.permitsService.validate(Functions.EFFECTS_CREATE);
    this.canUpdate = this.permitsService.validate(Functions.EFFECTS_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.EFFECTS_DELETE);

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
   * Sets the selected secondary effect to de modal for update data
   */
  setEffectId(id: string) {
    this.effectId = id;
    this.effectsService.getEffect(id).subscribe(
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
        this.toastr.error(
          this.translate.instant("EFFECTS.ERRORLOADING"),
          this.translate.instant("EFFECTS.MANAGEMENTS")
        );
      }
    );
  }

  /**
   * Requests to the backend service to create a new secondary effect
   */
  saveEffect() {
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
      this.effectsService.createEffect(datos).subscribe(
        (response: any) => {
          this.toastr.success(
            this.translate.instant("EFFECTS.EFFECTSAVED"),
            this.translate.instant("EFFECTS.MANAGEMENTS")
          );
          this.clear();
          this.ngOnInit();
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("EFFECTS.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Requests to the backend service to update a secondary effect
   */
  updateEffect() {
    let datos = new FormData();
    datos.append('idSecondary_Effect', this.effectId);
    datos.append('name_EN', this.modalNameEN);
    datos.append('description_EN', this.modalDescriptionEN);
    datos.append('name_ES', this.modalNameES);
    datos.append('description_ES', this.modalDescriptionES);
    datos.append('name_PT', this.modalNamePT);
    datos.append('description_PT', this.modalDescriptionPT);
    datos.append('name_FR', this.modalNameFR);
    datos.append('description_FR', this.modalDescriptionFR);
    datos.append('source', this.modalSource);
    this.effectsService.updateEffect(datos).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.toastr.success(
            this.translate.instant("EFFECTS.EFFECTUPDATED"),
            this.translate.instant("EFFECTS.MANAGEMENTS")
          );
          this.ngOnInit();
        }
      },
      (error) => {
        this.toastr.error(error, this.translate.instant("EFFECTS.MANAGEMENTS"));
      }
    );
  }

  /**
   * Requests to the backend service to delete a secondary effect
   */
  deleteEffect(id: string) {
    if (confirm(this.translate.instant("EFFECTS.CONFIRMDELETE"))) {
      this.effectsService.removeEffect(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("EFFECTS.EFFECTDELETED"),
              this.translate.instant("EFFECTS.MANAGEMENTS")
            );
            this.ngOnInit();
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("EFFECTS.MANAGEMENTS"));
        }
      );
    }
  }

  /**
   * Validates if the data of the secondary effect is correct
   */
  validar(): boolean {
    let val: number = 0;
    if (this.nameEN.trim().length > 0 && this.descriptionEN.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("EFFECTS.ENGLISH"),
        this.translate.instant("EFFECTS.VALIDATION")
      );
    }

    if (this.nameES.trim().length > 0 && this.descriptionES.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("EFFECTS.SPANISH"),
        this.translate.instant("EFFECTS.VALIDATION")
      );
    }

    if (this.namePT.trim().length > 0 && this.descriptionPT.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("EFFECTS.PORTUGUESE"),
        this.translate.instant("EFFECTS.VALIDATION")
      );
    }

    if (this.nameFR.trim().length > 0 && this.descriptionFR.trim().length > 0) {
      val += 1;
    } else {
      this.toastr.warning(
        this.translate.instant("EFFECTS.FRENCH"),
        this.translate.instant("EFFECTS.VALIDATION")
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
