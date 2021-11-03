import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
/**
 * error page
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  /**
   * flag that indicates if the current user should be redirected to
   * login or to lobby
   */
  goToLogin:boolean=true;

  /**
   * Constructor for ArchiveComponent
   * @param tokenStorageService Service used to get user local data
   * @param translate Service used for traslating the the content according to the user config
   */
    constructor(
    private tokenStorageService:TokenStorageService,
    public translate: TranslateService,
    private router: Router
    ) { }
  /**
   * onInit function for ArchiveCom 
   */
  ngOnInit(): void {
    if(!this.tokenStorageService.getUser){
      this.goToLogin=true;
    }else{
      this.goToLogin=false;
    }
    
  }
  /**
   * Redirects to login or lobby depending on the goToLogin flag
   */
  redirect(){
    if(this.goToLogin){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['lobby']);
    }
  }

}
