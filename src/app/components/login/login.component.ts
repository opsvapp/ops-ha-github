import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//Servicio para manejo de tokens
import { TokenStorageService } from '../../services/token-storage.service';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
/**
 * LoginComponent where the user can login into the app
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //Credenciales
  /**
   * User name
   */
  username: string = '';
  /**
   * Password
   */
  password: string = '';
  /**
   * Available languages in the app
   */
  languages = [
    { val: "en", title: "English"   },
    { val: "es", title: "Español"   },
    { val: "pt", title: "Português" },
    { val: "fr", title: "Français"  },
  ]
  /**
   * Selected language
   */
  lang: string = "en";

  /**
   * Constructor for LoginComponent
   * @param authService Service for authentication
   * @param tokenStorage Token service where we will storage the user token if successfully login
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param router angular Router
   * @param translate Service used for traslating the the content according to the user config
   */
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private router: Router,
    public translate: TranslateService
  ) {}

  /**
   * Checks if user is looged in and updates the language
   */
  ngOnInit(): void {
    let user: any = this.tokenStorage.getUser();
    if (Object.keys(user).length > 0) {
      this.router.navigate(['/lobby']);
    }
    this.lang = localStorage.getItem('lang') || 'en';
  }

  /**
   * Update the language used in the app
   */
  updateLanguage = (event: any) => {
    localStorage.setItem('lang', event.target.value);
    this.translate.use(event.target.value);
  };

  /**
   * Make the petition and store the token received
   */
  logIn() {
    let credenciales: any = {};
    credenciales['username'] = this.username;
    credenciales['password'] = this.password;
    this.authService.logIn(credenciales).subscribe(
      (response:any) => {
        if (response.statusCode == 200) {
          this.tokenStorage.saveToken(response.data.token);
          this.tokenStorage.saveUser(response.data.username);
          this.tokenStorage.saveFunctions(response.data.userFunctions);
          //Para permisos por pais
          localStorage.setItem('regional', String(response.data.regional));
          localStorage.setItem('idCountry', String(response.data.idCountry));
          window.location.href = './lobby';
        }
      },
      (error:any) => {
        this.toastr.error(error, this.translate.instant('COMMON.ERROR'));
      }
    );
  }
}
