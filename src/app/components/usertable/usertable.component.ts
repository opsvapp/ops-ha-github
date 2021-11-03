//Componente que maneja las acciones de la tabla
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ValidateService } from '../../services/validate.service';
import { ProfilesService } from '../../services/profiles.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
import { EmittersService } from '../../services/emitters/emitters.service';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';

/**
 * Component that allows the user to review, create, update and delete users
 */
@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css'],
})
export class UsertableComponent implements OnInit, OnDestroy {
  /**
   * Subscription to data changes
   */
  dataChange: Subscription | undefined;

  /**
   * List of data requested to the backend
   */
  listaResultados: any = [];

  //Binding
  /**
   * ngModels for actualId
   */
  actualId: number = -1;
  /**
   * ngModels for name
   */
  name: string = '';
  /**
   * ngModels for surname
   */
  surname: string = '';
  /**
   * ngModels for password
   */
  password: string = '';
  /**
   * ngModels for state
   */
  state: boolean = true;
  /**
   * ngModels for profile
   */
  profile: string = '';
  /**
   * ngModels for profileList
   */
  profileList: any = [];
  /**
   * Flag that indicates if the user is regional
   */
  regional: boolean = false;
  /**
   * Users country
   */
  countryId: string = '1';
  /**
   * countries list
   */
  countryList: Array<any> = [];

  //Permisos
  /**
    * Permission used to let the user Review
   */
  canReview = false;
  /**
     * Permission used to let the user Update
    */
  canUpdate = false;
  /**
     * Permission used to let the user Delete
    */
  canDelete = false;

  /**
   * App language
   */
  lang: string = 'en';
  /**
   * subscription for language changes
   */
  langChange: Subscription | undefined;

  /**
   * Constructor for userTable
   * @param usersService Service used to make requests to the backend
   * @param profilesService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param validateService Service that validates the strings
   * @param permitsService Service used for filtering info according to the user permissions
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private validateService: ValidateService,
    private profilesService: ProfilesService,
    private permitsService: PermitsService,
    private emitterService: EmittersService,
    private translate: TranslateService,
    private countryService: CountryService
  ) {}

  /**
   * Loads the needed data by the component
   */
  ngOnInit(): void {
    this.dataChange = this.emitterService
      .getUserChangeEmitter()
      .subscribe(() => {
        this.getUsers();
      });

    this.getUsers();

    //Lista de perfiles
    this.profilesService.getProfiles().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.profileList = response.data;
        }
      },
      (error) => {
        this.profileList = [];
        this.toastr.warning(
          this.translate.instant('USERSTABLE.CANTLOAD'),
          this.translate.instant('USERSTABLE.MANAGEMENT')
        );
      }
    );
    //Obtener listado de paises
    this.countryService.getCountries().subscribe(
      (response: any) => {
        if (response.data.length > 0) {
          this.countryList = response.data;
          //elimina el pais "regional"
          let indice = this.countryList.findIndex(
            (element) => element.idCountry == 1
          );
          this.countryList.splice(indice, 1);
        } else {
          this.toastr.warning(
            this.translate.instant('COUNTRY.NOCOUNTRIES'),
            this.translate.instant('COUNTRY.MANAGEMENTS')
          );
        }
      },
      (error: any) => {
        this.toastr.error(error, this.translate.instant('USERS.MANAGEMENT'));
      }
    );

    //Permisos
    this.canUpdate = this.permitsService.validate(Functions.USER_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.USER_DELETE);
    this.canReview = this.permitsService.validate(Functions.USER_REVIEW);
    //Lenguaje
    this.lang = localStorage.getItem('lang') || 'en';
    this.langChange = this.emitterService
      .getLangChangeEmitter()
      .subscribe((value: string) => {
        this.lang = value;
      });
  }

  /**
   * Unsubscribes from data change
   */
  ngOnDestroy(): void {
    this.dataChange?.unsubscribe();
  }

  /**
   * Gets the list of users
   */
  getUsers() {
    this.usersService.getUsers().subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.listaResultados = response.data;
        } else {
          this.listaResultados = [];
          this.toastr.warning(
            this.translate.instant('USERSTABLE.NODATA'),
            this.translate.instant('USERSTABLE.MANAGEMENT')
          );
        }
      },
      (error) => {
        this.toastr.error(
          error,
          this.translate.instant('USERSTABLE.MANAGEMENT')
        );
      }
    );
  }

  /**
   * loads the existing user data into the modal
   * @param id Id of the user that will be modified
   */
  setUserId(id: number) {
    this.actualId = id;
    this.usersService.getUser(id).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.name = response.data.name;
          this.surname = response.data.surname;
          this.state = response.data.state == 1 ? true : false;
          this.profile = String(response.data.idPerfil);
          this.password = '';
          this.countryId = String(response.data.idCountry);
          this.regional = response.data.regional == 0 ? false : true;
        }
      },
      (error) => {
        this.toastr.error(
          error,
          this.translate.instant('USERSTABLE.MANAGEMENT')
        );
      }
    );
  }

  /**
   * Deletes a user from the database
   * @param id ID of the user that will be deleted
   */
  deleteUser(id: number) {
    if (confirm(this.translate.instant('USERSTABLE.CONFIRMDELETE'))) {
      this.usersService.deleteUser(id).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            this.ngOnInit();
            this.toastr.success(
              this.translate.instant('USERSTABLE.USERDELETED'),
              this.translate.instant('USERSTABLE.MANAGEMENT')
            );
          }
        },
        (error) => {
          this.toastr.error(
            error,
            this.translate.instant('USERSTABLE.MANAGEMENT')
          );
        }
      );
    }
  }

  /**
   * Updates and user
   */
  updateUser() {
    if (this.validarDatos()) {
      //Recolecta los datos y los agrega si existen
      let info: any = {};
      info['id'] = this.actualId;
      this.name.trim().length > 0 ? (info['firstName'] = this.name) : void 0;
      this.surname.trim().length > 0
        ? (info['lastName'] = this.surname)
        : void 0;
      this.password.trim().length > 0
        ? (info['password'] = this.password)
        : void 0;
      info['isLocked'] = this.state;
      info['role'] = this.profile; //en frontend se quedo como profile
      info['regional'] = this.regional;
      info['idCountry'] = this.countryId;
      //Realiza el request
      this.usersService.updateUser(info).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.ngOnInit();
            this.toastr.success(
              this.translate.instant('USERSTABLE.USERUPDATED'),
              this.translate.instant('USERSTABLE.MANAGEMENT')
            );
            this.name = '';
            this.surname = '';
            this.password = '';
            this.profile = '';
            this.state = true;
            this.countryId = '1';
          }
        },
        (error) => {
          this.toastr.error(
            error,
            this.translate.instant('USERSTABLE.MANAGEMENT')
          );
        }
      );
    }
  }

  /**
   * toggles this.regional
   * if regional then countryId = 1
   */
  setRegional() {
    this.regional = this.regional ? false : true;
    if (this.regional) {
      this.countryId = '1';
    }
  }

  /**
   * Validates the data of a form
   * @returns True if the from is correct
   */
  validarDatos() {
    let total: number = 0;

    if (this.validateService.validarNombres(this.name)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('USERSTABLE.INVALIDNAMES'),
        this.translate.instant('USERSTABLE.VALIDATION')
      );
    }
    if (this.validateService.validarNombres(this.surname)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('USERSTABLE.INVALIDLASTNAMES'),
        this.translate.instant('USERSTABLE.VALIDATION')
      );
    }
    if (this.password.trim().length === 0) {
      total++;
    } else {
      if (this.validateService.validarPassword(this.password)) {
        total++;
      } else {
        this.toastr.warning(
          this.translate.instant('USERSTABLE.MANAGEMENTINVALIDPASSWORD'),
          this.translate.instant('USERSTABLE.VALIDATION')
        );
      }
    }

    if (this.regional == false && Number(this.countryId) > 1) {
      total++;
    } else if (this.regional && Number(this.countryId) == 1) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('USERS.SELECTEDCOUNTRY'),
        this.translate.instant('USERS.VALIDATIONS')
      );
    }

    return total === 4 ? true : false;
  }
}
