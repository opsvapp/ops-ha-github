//Header de las paginas
import { Component, OnInit } from '@angular/core';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
//auth
import { AuthService } from '../../services/auth.service';
//Storage
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmittersService } from '../../services/emitters/emitters.service';
/**
 * Header component shared for all the pages in the app
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  /**
   * Rule 
   */
  showDiv = false;
  /**
   * Permission for 
   */
  canReviewUsers = false;
  /**
   * Permission for ReviewProfiles
   */
  canReviewProfiles = false;
  /**
   * Permission for ReviewLogs
   */
  canReviewLogs = false;
  /**
   * Permission for ManageApp
   */
  canManageApp = false;
  /**
   * Permission for ReviewNews
   */
  canReviewNews = false;
  /**
   * Permission for CreateNews
   */
  canCreateNews = false;
  /**
   * Permission for ReviewVaccines
   */
  canReviewVaccines = false;
  /**
   * Permission for ReviewDiseases
   */
  canReviewDiseases = false;
  /**
   * Permission for ReviewEffects
   */
  canReviewEffects = false;
  /**
   * Permission for ReviewCountry
   */
  canReviewCountry = false;
  /**
   * Permission for ReviewAdminOne
   */
  canReviewAdminOne = false;
  /**
   * Permission for ReviewAdminTwo
   */
  canReviewAdminTwo = false;
  /**
   * Permission for ReviewScheme
   */
  canReviewScheme = false;
  /**
   * Permission for ReviewTravel
   */
  canReviewTravel = false;
  /**
   * Permission for ReviewVaccineCountry
   */
  canReviewVaccineCountry = false;
  /**
   * Permission for ReviewHealthCenter
   */
  canReviewHealthCenter = false;
  /**
   * Permission for ReviewVaccineCenter
   */
  canReviewVaccineCenter = false;
  /**
   * Permission for ReviewVaccinationPoint
   */
  canReviewVaccinationPoint = false;
  /**
   * Permission for UploadFiles
   */
  canUploadFiles = false;

  /**
    * Language used in the app
   */
  lang: string = "";

  /**
   * Constructor for header component
   * @param permitsService Service that validates what functions have the current user
   * @param authService Service for authentication
   * @param storage Service of local storage
   * @param router Service used to redirect to the different pages
   * @param translate Service used for translating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private permitsService: PermitsService,
    private authService: AuthService,
    private storage: StorageService,
    private router: Router,
    public translate: TranslateService,
    private emitterService: EmittersService
  ) {}

  /**
   * Inits the component and filters the options according to the user permissions
   */
  ngOnInit(): void {
    //Validar Permisos
    this.canReviewUsers = this.permitsService.validate(Functions.USER_REVIEW);
    this.canReviewProfiles = this.permitsService.validate(
      Functions.PROFILE_REVIEW
    );
    this.canReviewLogs = this.permitsService.validate(Functions.LOG_REVIEW);
    this.canReviewNews = this.permitsService.validate(Functions.NEWS_REVIEW);
    this.canCreateNews = this.permitsService.validate(Functions.NEWS_CREATE);
    this.canManageApp = this.permitsService.validate(Functions.APP_REVIEW);
    this.canReviewVaccines = this.permitsService.validate(
      Functions.VACCINE_REVIEW
    );
    this.canReviewDiseases = this.permitsService.validate(
      Functions.DISEASE_REVIEW
    );
    this.canReviewEffects = this.permitsService.validate(
      Functions.EFFECTS_REVIEW
    );
    this.canReviewCountry = this.permitsService.validate(
      Functions.COUNTRY_REVIEW
    );
    this.canReviewAdminOne = this.permitsService.validate(
      Functions.ADMIN1_REVIEW
    );
    this.canReviewAdminTwo = this.permitsService.validate(
      Functions.ADMIN2_REVIEW
    );
    this.canReviewScheme = this.permitsService.validate(
      Functions.SCHEME_REVIEW
    );
    this.canReviewTravel = this.permitsService.validate(
      Functions.TRAVEL_REVIEW
    );
    this.canReviewVaccineCountry = this.permitsService.validate(
      Functions.VCOUNTRY_REVIEW
    );
    this.canReviewHealthCenter = this.permitsService.validate(
      Functions.HCENTER_REVIEW
    );
    this.canReviewVaccineCenter = this.permitsService.validate(
      Functions.VCENTER_REVIEW
    );
    this.canReviewVaccinationPoint = this.permitsService.validate(
      Functions.VPOINT_REVIEW
    );

    this.canUploadFiles = this.permitsService.validate(Functions.UPLOAD);

    this.lang = localStorage.getItem('lang') || '';
  }

  /**
   * Updates the language of the app
   * @param lang Language code
   */
  updateLanguage = (lang: any) => {
    this.lang = lang;
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.emitterService.emmittLangChangeEvent(lang);
  };

  /**
   * Logs out the user from the app
   */
  logOut() {
    this.authService.logOutReq().subscribe();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  /**
   * When you access directly by the menu, this cleans the edition of the news.
   */
  clearUpdateMode() {
    this.storage.removeKey('UPDATE_ID');
  }
}
