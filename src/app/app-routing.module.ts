import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Pages
import { UserComponent } from './pages/user/user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { LogsComponent } from './pages/logs/logs.component';
import { NewsComponent } from './pages/news/news.component';
import { ArchiveComponent } from './pages/archive-page/archive.component';
import { VaccinepageComponent } from './pages/vaccine-page/vaccinepage.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { DiseasepageComponent } from './pages/disease-page/diseasepage.component';
import { EffectspageComponent } from './pages/effects-page/effectspage.component';
import { CountrypageComponent } from './pages/country-page/countrypage.component';
import { SchemepageComponent } from './pages/scheme-page/schemepage.component';
import { TravelComponent } from './pages/travel/travel.component';
import { VaccineCountryPageComponent } from './pages/vaccine-country-page/vaccine-country-page.component';
import { VpointPageComponent } from './pages/vpoint-page/vpoint-page.component';
//Guard
import { AuthGuard as Guard } from './helpers/auth.guard';
import { HealthCenterPageComponent } from './pages/health-center-page/health-center-page.component';
import { VaccineCenterPageComponent } from './pages/vaccine-center-page/vaccine-center-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent, canActivate: [Guard] },
  { path: 'users', component: UserComponent, canActivate: [Guard] },
  { path: 'profiles', component: ProfileComponent, canActivate: [Guard] },
  { path: 'logs', component: LogsComponent, canActivate: [Guard] },
  { path: 'news', component: NewsComponent, canActivate: [Guard] },
  { path: 'archive', component: ArchiveComponent, canActivate: [Guard] },
  { path: 'vaccine', component: VaccinepageComponent, canActivate: [Guard] },
  { path: 'disease', component: DiseasepageComponent, canActivate: [Guard] },
  { path: 'effects', component: EffectspageComponent, canActivate: [Guard] },
  { path: 'country', component: CountrypageComponent, canActivate: [Guard] },
  { path: 'scheme', component: SchemepageComponent, canActivate: [Guard] },
  { path: 'travel', component: TravelComponent, canActivate: [Guard] },
  {
    path: 'countryVaccine',
    component: VaccineCountryPageComponent,
    canActivate: [Guard],
  },
  {
    path: 'vaccinationPoint',
    component: VpointPageComponent,
    canActivate: [Guard],
  },
  {
    path: 'healthCenter',
    component: HealthCenterPageComponent,
    canActivate: [Guard],
  },
  {
    path: 'vaccineCenter',
    component: VaccineCenterPageComponent,
    canActivate: [Guard],
  },
  { path: 'upload', component: UploadPageComponent, canActivate: [Guard] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  useHash: true, },)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
