import { Component, OnDestroy, OnInit } from '@angular/core';
//Notificaciones
import { ToastrService } from 'ngx-toastr';
//Permisos
import { PermitsService } from '../../services/permits.service';
import { Functions } from '../../helpers/functions.enum';
//Servicio de noticias
import { NewsService } from '../../services/news.service';
//Servicio de almacenamiento
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { Router } from '@angular/router';

/**
 * NewstableComponent the users will be able to see the news
 */
@Component({
  selector: 'app-newstable',
  templateUrl: './newstable.component.html',
  styleUrls: ['./newstable.component.css'],
})
export class NewstableComponent implements OnInit, OnDestroy {
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
  //Lista de Noticias
  /**
   * news array
   */
  newsList: Array<any> = [];
  /**
   * Oldest displayed news
   */
  startDate: string = '';
  /**
   * newest displayed news
   */
  endDate: string = '';

  /**
    * Language used in the app
   */
  lang: string = "en";
  /**
   * subscribes to language changes
   */
  langChange: Subscription | undefined;

  /**
   * Constructor for NewstableComponent
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param permitsService Service that validates what functions have the current user
   * @param newsService Service used to make requests to the backend
   * @param storage Service of local storage
   * @param translate Service used for traslating the the content according to the user config
   * @param emitterService Services used to emit events
   */
  constructor(
    private toastr: ToastrService,
    private permitsService: PermitsService,
    private newsService: NewsService,
    private storage: StorageService,
    public translate: TranslateService,
    private emitterService: EmittersService,
    private router: Router
  ) {}

  /**
   * Sets a default start and end date, and initializes the variables
   */
  ngOnInit(): void {
    this.startDate = new Date().toISOString().substr(0, 10);
    this.endDate = new Date().toISOString().substr(0, 10);
    //Valdacion de permisos
    this.canReview = this.permitsService.validate(Functions.NEWS_REVIEW);
    this.canUpdate = this.permitsService.validate(Functions.NEWS_UPDATE);
    this.canDelete = this.permitsService.validate(Functions.NEWS_DELETE);

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
   * Returns the list of notifications in a range of dates 
   */
  getNews() {
    const options: {
      weekday: "long";
      year: "numeric";
      month: "long";
      day: "numeric";
    } = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const lang = `${this.translate.currentLang}-${this.translate.currentLang.toUpperCase()}`;
    //Eliminar clave para actualizar
    this.storage.removeKey('UPDATE_ID');
    //Busqueda
    if (Date.parse(this.startDate) && Date.parse(this.endDate)) {
      this.newsService.getNews(this.startDate, this.endDate).subscribe(
        (response: any) => {
          if (response.statusCode == 200 && response.data.length > 0) {
            this.newsList = response.data;
            //Conversion de formato de fecha, el server la devuelve en ISO
            this.newsList.forEach((item) => {
              item.news_date = new Date(item.news_date).toLocaleDateString(lang, options);
              item.start_date = new Date(item.start_date).toLocaleDateString(lang, options);
              item.end_date = new Date(item.end_date).toLocaleDateString(lang, options);
            });
          } else {
            this.toastr.warning(
              this.translate.instant("NEWSTABLE.NOTFOUND"), 
              this.translate.instant("NEWSTABLE.NEWS")
            );
            this.newsList = [];
          }
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("NEWSTABLE.NEWS"));
        }
      );
    } else {
      this.toastr.warning(
        this.translate.instant("NEWSTABLE.VALIDDATES"), 
        this.translate.instant("NEWSTABLE.NEWS")
      );
    }
  }

  /**
   * Redirects the user to the edit article view
   * @param id Id of the article that wants to be updated
   */
  updateNews(id: string) {
    this.storage.setKey('UPDATE_ID', String(id));
    this.router.navigate(['/news']);
  }

  /**
   * Deletes an article
   * @param id Id of the article that will be deleted
   */
  deleteNews(id: string) {
    if (confirm(this.translate.instant("NEWSTABLE.CONFIRMDELETE"))) {
      this.newsService.deleteNews(id).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success(
              this.translate.instant("NEWSTABLE.NEWDELETED"), 
              this.translate.instant("NEWSTABLE.NEWS")
            );
            this.getNews();
          }
        },
        (error: any) => {
          this.toastr.error(error, this.translate.instant("NEWSTABLE.NEWS"));
        }
      );
    }
  }
}
