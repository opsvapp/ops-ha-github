import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Footer component shared by all the pages in the app
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  /**
   * Constructor for footer component
   * @param translate Service used for translating the the content according to the user config
   */
  constructor(public translate: TranslateService) { }
  
  /**
   * On init function
   */
  ngOnInit(): void { }
}
