//Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Toaster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//Boostrap Icons
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import {
  trash,
  pencil,
  gear,
  personPlus,
  save,
  xCircle,
  journal,
  flag,
  search,
  chevronBarDown,
  boxArrowRight,
  personCircle,
  fileLock2,
  clipboardData,
  plusCircle,
  newspaper,
  globe,
  infoCircleFill,
  download
} from 'ngx-bootstrap-icons';
//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfiletableComponent } from './components/profiletable/profiletable.component';
import { LogComponent } from './components/log/log.component';
import { LogsComponent } from './pages/logs/logs.component';
import { UserComponent } from './pages/user/user.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { UsersComponent } from './components/users/users.component';
//Interceptor
import { authInterceptorProviders } from './helpers/auth.interceptor';
//Components
import { ArchiveComponent } from './pages/archive-page/archive.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CountrypageComponent } from './pages/country-page/countrypage.component';
import { CountryComponent } from './components/country/country.component';
import { DiseasepageComponent } from './pages/disease-page/diseasepage.component';
import { DiseaseComponent } from './components/disease/disease.component';
import { EditorComponent } from './components/editor/editor.component';
import { EffectsComponent } from './components/effects/effects.component';
import { EffectspageComponent } from './pages/effects-page/effectspage.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NewsComponent } from './pages/news/news.component';
import { NewstableComponent } from './components/newstable/newstable.component';
import { SchemeComponent } from './components/scheme/scheme.component';
import { SchemepageComponent } from './pages/scheme-page/schemepage.component';
import { TravelVaccineComponent } from './components/travel-vaccine/travel-vaccine.component';
import { TravelComponent } from './pages/travel/travel.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { VaccinepageComponent } from './pages/vaccine-page/vaccinepage.component';
import { VaccineCountryComponent } from './components/vaccine-country/vaccine-country.component';
import { VaccineCountryPageComponent } from './pages/vaccine-country-page/vaccine-country-page.component';
import { VaccinationPointComponent } from './components/vaccination-point/vaccination-point.component';
import { VpointPageComponent } from './pages/vpoint-page/vpoint-page.component';
import { HealthCenterComponent } from './components/health-center/health-center.component';
import { HealthCenterPageComponent } from './pages/health-center-page/health-center-page.component';
import { VaccineCenterPageComponent } from './pages/vaccine-center-page/vaccine-center-page.component';
import { VaccineCenterComponent } from './components/vaccine-center/vaccine-center.component';

//i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { UploadComponent } from './components/upload/upload.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { NgxPaginationModule } from 'ngx-pagination';

/**
 * Configs the i18n to locate the translate files
 * @param http http module to used do http requests
 * @returns an http loader
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

/**
 * Icons used on the app
 */
const icons = {
  trash,
  pencil,
  gear,
  personPlus,
  save,
  xCircle,
  boxArrowRight,
  personCircle,
  fileLock2,
  clipboardData,
  plusCircle,
  journal,
  flag,
  search,
  newspaper,
  chevronBarDown,
  globe,
  download,
  infoCircleFill
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UsersComponent,
    ProfilesComponent,
    UsertableComponent,
    ProfiletableComponent,
    UserComponent,
    ProfileComponent,
    ErrorComponent,
    LogComponent,
    LogsComponent,
    NewsComponent,
    ArchiveComponent,
    EditorComponent,
    NewstableComponent,
    VaccineComponent,
    VaccinepageComponent,
    LobbyComponent,
    DiseasepageComponent,
    DiseaseComponent,
    EffectsComponent,
    EffectspageComponent,
    CountrypageComponent,
    CountryComponent,
    SchemeComponent,
    SchemepageComponent,
    TravelVaccineComponent,
    TravelComponent,
    VaccineCountryComponent,
    VaccineCountryPageComponent,
    VaccinationPointComponent,
    VpointPageComponent,
    HealthCenterComponent,
    HealthCenterPageComponent,
    VaccineCenterPageComponent,
    VaccineCenterComponent,
    UploadComponent,
    UploadPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //Cliente Http
    AppRoutingModule, //Definicion de Rutas
    FormsModule, //Manejo de ngModel
    BrowserAnimationsModule, //Required animations module
    ReactiveFormsModule,
    NgxBootstrapIconsModule.forRoot(icons), //Bootstrap icons
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
    }), //Toastr & Config
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }
    }),
    AngularEditorModule,
    NgxPaginationModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
