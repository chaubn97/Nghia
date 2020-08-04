import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {ScheduleModel} from "../../../model/schedule.model";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {RoomService} from "../../../shared/services/room.service";
import {MovieService} from "../../../shared/services/movie.service";
import {SnotifyService} from "ng-snotify";


@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {
  form: FormGroup;
  cinema : ScheduleModel;
  rooms = [] ;
  movies = [];
  submitted = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public modal: NgbActiveModal,
              private eventManagement: EventManagement,
              private scheduleService: ScheduleService,
              private roomService: RoomService,
              private movieService: MovieService,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.roomService.fetch().subscribe(rooms => {this.rooms = rooms;});
    this.movieService.fetch().subscribe(movies => {this.movies = movies;});
    this.form = this.fb.group({
      scheduleId: [''],
      roomId: ['', Validators.required],
      movieId: ['', Validators.required],
      startTime: ['', Validators.required],
      priceMovie: ['', Validators.required]
    });


  }

  get f() { return this.form.controls; }
  doSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var checkSchedule = [];
    const schedule = this.form.value;
    schedule.startTime = this.form.value.startTime+':00';
    // checkSchedule.push(this.scheduleService.check(schedule));
    // if (checkSchedule.length==1){
    this.scheduleService.create(schedule).subscribe(
        (response) =>{
          this.eventManagement.broadcast('UPDATE_SCHEDULE');

          if(response.responseCode == 2) {
            this.snotifyService.error('Create failed! This schedule is duplicated');
          } else {
            this.snotifyService.success('Create success!');
            this.modal.close();
          }
        },
        error => {
          console.log(error);
          this.snotifyService.error('Create failed!');
        });

  }
}
