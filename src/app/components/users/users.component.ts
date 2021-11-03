//Componente que maneja la informacion de usuarios creados
import { Component, OnInit } from '@angular/core';
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
 * Component that manages users
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  /**
   * ngModel for name
   */
  name: string = '';
  /**
   * ngModel for surname
   */
  surname: string = '';
  /**
   * ngModel for mail
   */
  mail: string = '';
  /**
   * ngModel for password
   */
  password: string = '';
  /**
   * ngModel for state
   */
  state: boolean = true;
  /**
   * ngModel for profile
   */
  profile: number = 1;
  /**
   * ngModel for profileList
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

  /**
    * Permission used to let the user Create
   */
  canCreate = false;

  /**
   * App language
   */
  lang: string = 'en';
  /**
   * subscription for language changes
   */
  langChange: Subscription | undefined;

  /**
   * Constructor for usersComponent
   * @param usersService Service used to make requests to the backend
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param validateService Service that validates if the form is valid
   * @param profilesService Service that manages user profiles
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
   * Requests the existent profiles
   */
  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe(
      (data: any) => {
        if (data.statusCode == 200) {
          this.profileList = data.data;
        }
      },
      (error) => {
        this.profileList = [];
        this.toastr.error(error, this.translate.instant('USERS.MANAGEMENT'));
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
    this.canCreate = this.permitsService.validate(Functions.USER_CREATE);
    //Lenguaje
    this.lang = localStorage.getItem('lang') || 'en';
    this.langChange = this.emitterService
      .getLangChangeEmitter()
      .subscribe((value: string) => {
        this.lang = value;
      });
  }

  /**
   * Sends a request to create a new user
   */
  createUser() {
    if (
      confirm(this.translate.instant('USERS.CONFIRMDATA')) &&
      this.validarDatos()
    ) {
      let info = {
        firstName: this.name,
        lastName: this.surname,
        mail: this.mail,
        username: this.mail,
        password: this.password,
        roles: this.profile,
        isLocked: this.state,
        regional: this.regional,
        idCountry: this.countryId,
      };
      this.usersService.createUser(info).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant('USERS.USERCREATED'),
              this.translate.instant('USERS.MANAGEMENT')
            );
            this.clear();
          }
        },
        (error) => {
          this.toastr.error(error, this.translate.instant('USERS.MANAGEMENT'));
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
   * clears the from data
   */
  private clear() {
    this.name = '';
    this.surname = '';
    this.mail = '';
    this.password = '';
    this.profile = 1;
    this.state = true;
    this.regional = false;
    this.countryId = '1';
    this.emitterService.emittUserChangeEvent(true);
  }

  /**
   * Validates the data of the fields entered
   * @returns True if all the data is correct
   */
  validarDatos(): boolean {
    let total: number = 0;

    if (this.validateService.validarNombres(this.name)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('USERS.VALIDATENAME'),
        this.translate.instant('USERS.VALIDATIONS')
      );
    }

    if (this.validateService.validarNombres(this.surname)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('USERS.VALIDATELASTNAME'),
        this.translate.instant('USERS.VALIDATIONS')
      );
    }

    if (this.validateService.validarEmail(this.mail)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('USERS.VALIDATEEMAIL'),
        this.translate.instant('USERS.VALIDATIONS')
      );
    }

    if (this.validateService.validarPassword(this.password)) {
      total++;
    } else {
      this.toastr.warning(
        this.translate.instant('USERS.VALIDATEPASSWORD'),
        this.translate.instant('USERS.VALIDATIONS')
      );
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
    return total === 5 ? true : false;
  }

  /**
   * Reloads the window
   */
  refresh() {
    window.location.reload();
  }
}
