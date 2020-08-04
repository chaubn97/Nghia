import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {ScheduleModel} from "../../../model/schedule.model";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-schedule-delete',
  templateUrl: './schedule-delete.component.html',
  styleUrls: ['./schedule-delete.component.css']
})
export class ScheduleDeleteComponent implements OnInit {

  schedule: ScheduleModel;
  constructor(public modal: NgbActiveModal,
              private scheduleService: ScheduleService,
              private eventManagement: EventManagement,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
  }

  delete() {
    this.scheduleService.delete(this.schedule.scheduleId).subscribe(
        () => {
          this.eventManagement.broadcast('UPDATE_SCHEDULE');
          this.modal.close();
            this.snotifyService.success('Delete success!');
        }, error => {
            console.log(error);
            this.snotifyService.error('Delete failed! ');
            this.modal.close();
        }
    );

  }

}
