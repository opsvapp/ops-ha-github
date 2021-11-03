import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Lobby page
 */
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  /**
   * Constructor for LobbyComponent
   * @param translate Service used for traslating the the content according to the user config
   */
  constructor(public translate: TranslateService) { }

  /**
   * onInit function for LobbyComponent 
   */
  ngOnInit(): void { }
}
