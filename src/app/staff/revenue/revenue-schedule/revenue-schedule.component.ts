import { Component, OnInit } from '@angular/core';
import {MovieRevenueModel} from "../../../model/movie-revenue.model";
import {CinemaRevenueModel} from "../../../model/cinema-revenue.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RevenueService} from "../../../shared/services/revenue.service";
import {EventManagement} from "../../../shared/services/event.management";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ScheduleRevenueModel} from "../../../model/schedule-revenue.model";

@Component({
  selector: 'app-revenue-schedule',
  templateUrl: './revenue-schedule.component.html',
  styleUrls: ['./revenue-schedule.component.css']
})
export class RevenueScheduleComponent implements OnInit {

  schedules: ScheduleRevenueModel[] = [];
  startTime: Date;
  endTime: Date;
  p: number = 1;
  movieRevenueDto : MovieRevenueModel;
  constructor(private fb: FormBuilder,
              private revenueService: RevenueService,
              private eventManagement: EventManagement,
              public modal: NgbModal) { }

  ngOnInit(): void {
    this.loadData();
    this.eventManagement.subscribe('UPDATE_SCHEDULE_REVENUE', () => this.loadData());
  }

  loadData() {
    var scheduleRevenue = new ScheduleRevenueModel(this.movieRevenueDto.movieId,this.movieRevenueDto.startTime,this.movieRevenueDto.endTime);
    this.revenueService.getAllRevenueScheduleByMovie(scheduleRevenue).subscribe(scheduleRevenues => {
      this.schedules = scheduleRevenues;
    }, error => console.log(error));

  }



}
