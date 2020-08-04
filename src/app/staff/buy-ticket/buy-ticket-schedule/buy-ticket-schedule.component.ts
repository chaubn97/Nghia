import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleModel} from "../../../model/schedule.model";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {EventManagement} from "../../../shared/services/event.management";

@Component({
  selector: 'app-buy-ticket-schedule',
  templateUrl: './buy-ticket-schedule.component.html',
  styleUrls: ['./buy-ticket-schedule.component.css']
})
export class BuyTicketScheduleComponent implements OnInit {
  schedules: ScheduleModel[];
  p: number = 1;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private eventManagement: EventManagement,) { }

  ngOnInit(): void {

    this.route.data.subscribe(({schedules}) => { this.schedules = schedules;});
    if (this.schedules == null){
    this.loadSchedules();
    this.eventManagement.subscribe('UPDATE_MOVIE', () => this.loadSchedules());
    }
  }
  loadSchedules() {
    this.scheduleService.findByCurrentTime().subscribe(schedules => {
      this.schedules = schedules;
    }, error => console.log(error));
  }
}
