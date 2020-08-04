import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleModel} from "../../../model/schedule.model";

@Component({
  selector: 'app-ticket-schedule',
  templateUrl: './ticket-schedule.component.html',
  styleUrls: ['./ticket-schedule.component.css']
})
export class TicketScheduleComponent implements OnInit {
  customerId : number;
  constructor(private router: Router,
              private route: ActivatedRoute,) {

  }
  schedules: ScheduleModel[];
  p: number = 1;
  // this.cinemaService.fetch().subscribe(cinemas => {this.cinemas = cinemas;});
  ngOnInit(): void {
    this.route.data.subscribe(({schedules}) => { this.schedules = schedules;});
    this.route.params.subscribe(({customerId}) => { this.customerId = customerId;});
  }
}
