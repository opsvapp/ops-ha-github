//Componente que maneja la informacion de profiles
import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../../services/profiles.service';
import { ValidateService } from '../../services/validate.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { EmittersService } from '../../services/emitters/emitters.service';
import { TranslateService } from '@ngx-translate/core';
/**
 * Table where user can view and create new profiles
 */
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent implements OnInit {
  //Binding
  /**
   * Name of the profile
   */
  name: string = '';
  /**
   * Description of the profile
   */
  description: string = '';
  /**
   * State of the profile
   */
  state: boolean = true;

  //Permisos
  /**
    * Permission used to let the user Create
   */
  canCreate = false;

  /**
   * Constructor for ProfilesComponent
   * @param profilesService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param validateService Service that validates if texts are correct 
   * @param permitsService Service used for filtering info according to the user permissions
   * @param translate Service used for traslating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private profilesService: ProfilesService,
    private toastr: ToastrService,
    private validateService: ValidateService,
    private permitsService: PermitsService,
    public  translate: TranslateService,
    private emitterService: EmittersService
    ) {}

  /**
   * Validate permissions
   */
  ngOnInit(): void {
    this.canCreate = this.permitsService.validate(Functions.PROFILE_CREATE);
  }

  /**
   * Create the profile
   */
  createProfile() {
    //Valida los datos para crear el perfil
    if (this.validarDatos()) {
      let info = {
        name: this.name,
        description: this.description,
        active: this.state,
      };
      //Llama el servicio
      this.profilesService.createProfile(info).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("PROFILES.PROFILECREATED"),
              this.translate.instant("PROFILES.PROFILES")
              );
            this.emitterService.emmittPerfilChangeEvent(true);
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant("PROFILES.PROFILES"));
        }
      );
    }
  }

  
  /**
   * If it passes the 2 validations gives true for valid the form 
   */
  validarDatos() {
    let total: number = 0;
    if (this.validateService.validarTitulos(this.name)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant("PROFILES.INVALIDUSERNAME"),
        this.translate.instant("PROFILES.VALIDATIONS")
      );
    }
    if (this.description.trim().length > 0) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant("PROFILES.EMPTYDESC"),
        this.translate.instant("PROFILES.VALIDATIONS")
      );
    }
    return total === 2 ? true : false;
  }

  /**
   * Reloads the window
   */
  refresh() {
    window.location.reload();
  }
}
