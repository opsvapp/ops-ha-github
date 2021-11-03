'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">opsha documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7d871b6c764820c73b2427b2c881b435"' : 'data-target="#xs-components-links-module-AppModule-7d871b6c764820c73b2427b2c881b435"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7d871b6c764820c73b2427b2c881b435"' :
                                            'id="xs-components-links-module-AppModule-7d871b6c764820c73b2427b2c881b435"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ArchiveComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArchiveComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CountryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CountryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CountrypageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CountrypageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiseaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiseaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiseasepageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiseasepageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EffectsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EffectsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EffectspageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EffectspageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HealthCenterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HealthCenterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HealthCenterPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HealthCenterPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LobbyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LobbyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewstableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewstableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfiletableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfiletableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchemeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SchemeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchemepageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SchemepageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TravelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TravelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TravelVaccineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TravelVaccineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsertableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsertableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VaccinationPointComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VaccinationPointComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VaccineCenterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VaccineCenterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VaccineCenterPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VaccineCenterPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VaccineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VaccineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VaccineCountryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VaccineCountryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VaccineCountryPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VaccineCountryPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VaccinepageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VaccinepageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VpointPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VpointPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link">CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiseaseService.html" data-type="entity-link">DiseaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EffectsService.html" data-type="entity-link">EffectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmittersService.html" data-type="entity-link">EmittersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FunctionsService.html" data-type="entity-link">FunctionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthCenterService.html" data-type="entity-link">HealthCenterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsService.html" data-type="entity-link">LogsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link">NewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermitsService.html" data-type="entity-link">PermitsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfilesService.html" data-type="entity-link">ProfilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchemesService.html" data-type="entity-link">SchemesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link">StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenStorageService.html" data-type="entity-link">TokenStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TravelVaccineService.html" data-type="entity-link">TravelVaccineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link">UploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VaccinationPointService.html" data-type="entity-link">VaccinationPointService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VaccineCenterService.html" data-type="entity-link">VaccineCenterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VaccineCountryService.html" data-type="entity-link">VaccineCountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VaccineService.html" data-type="entity-link">VaccineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateService.html" data-type="entity-link">ValidateService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});