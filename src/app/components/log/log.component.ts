import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
/**
 * LogComponent component where the user can review logs from other users
 */
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  /**
   * Logs gotten from the backend
   */
  logs: any[] = [];
  /**
   * Log form with data to request new logs
   */
  logsForm: FormGroup;
  /**
   * Action types that can be requested to the backend
   */
  actionTypes = [
    { val: 'AUTHENTICATION',    text: "LOG.AUTHENTICATION" },
    { val: 'FUNCTIONS',         text: "LOG.FUNCTIONS" },
    { val: 'ROLE',              text: "LOG.ROLE" },
    { val: 'USER',              text: "LOG.USERS" },
    { val: 'LOGS',              text: "LOG.LOGS" },
    { val: 'SCHEME',            text: "LOG.SCHEME" },
    { val: 'ADMIN 1',           text: "LOG.ADMIN_1" },
    { val: 'ADMIN 2',           text: "LOG.ADMIN_2" },
    { val: 'COUNTRY',           text: "LOG.COUNTRY" },
    { val: 'ARTICLE',           text: "LOG.ARTICLE" },
    { val: 'VACCINE',           text: "LOG.VACCINE" },
    { val: 'DISEASE',           text: "LOG.DISEASE" },
    { val: 'STATICS',           text: "LOG.STATICS" },
    { val: 'TRAVEL VACCINE',    text: "LOG.TRAVEL_VACCINE" },
    { val: 'SECONDARY EFFECT',  text: "LOG.SECONDARY_EFFECT" },
    { val: 'VACCINATION POINT', text: "LOG.VACCINATION_POINT" },

    { val: 'LOAD FILE', text: "LOG.LOAD_FILE" },
    { val: 'VACCINE POINT', text: "LOG.VACCINE_POINT" },
    { val: 'HEALTH CENTER', text: "LOG.HEALTH_CENTER" },
    { val: 'VACCINE CENTER', text: "LOG.VACCINE_CENTER" },
    { val: 'VACCINE COUNTRY', text: "LOG.VACCINE_COUNTRY" }

  ];
  /**
   * Page number
   */
  p: number = 1;

  /**
   * Constructor for LogComponent
   * @param toastr Service used to show informative messages to the user and let him know whats happening
   * @param fb Form builder
   * @param logsService Service used to make requests to the backend
   * @param translate Service used for traslating the the content according to the user config
   */
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private logsService: LogsService,
    public translate: TranslateService
  ) {
    this.logsForm = this.fb.group({
      username: ['', Validators.required],
      actionType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      
    });
    //Fechas default
    let fecha = new Date()
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-");

    this.logsForm.patchValue({
      startDate: new Date(fecha).toISOString().substr(0, 10),
      endDate: new Date(fecha).toISOString().substr(0, 10),
    });
  }

  /**
   * On init function
   */
  ngOnInit(): void { }
  

  /**
   * Requests the logs to the backend 
   * @param form Form with the data
   * @returns the logs founded
   */
  async searchLogs(form: FormGroup) {
    //Validacion
    const { value } = form;
    value['startDate'] = `${value['startDate']} 00:00:00`;
    value['endDate'] = `${value['endDate']} 23:59:59`;
    if (form.invalid) {
      this.toastr.warning(
        this.translate.instant("LOG.REQUIRED"), 
        this.translate.instant("LOG.VALIDATION")
      );
      return;
    }
    //Realiza peticion
    try {
      const response = await this.logsService.getLogs(value);
      if (response.statusCode == 200) {
        this.logs = response.data;
        this.p = 1;
        //Convierte la fecha de ISO a UTC, del servidor viene como ISO.
        this.logs.forEach((item: any) => {
          item.timeValidatorSecure = new Date(
            item.timeValidatorSecure
          ).toLocaleString();
        });
        if (this.logs.length == 0)
          this.toastr.info(
            this.translate.instant("LOG.NOLOGS"), 
            this.translate.instant("LOG.LOGS")
          );
      }
    } catch (error) {
      this.toastr.error(error, this.translate.instant("LOG.LOGS"));
    }
  }
}
