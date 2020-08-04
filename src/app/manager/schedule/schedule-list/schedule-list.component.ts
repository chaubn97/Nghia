import { Component, OnInit } from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {ScheduleModel} from "../../../model/schedule.model";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {ScheduleDeleteComponent} from "../schedule-delete/schedule-delete.component";
import {ScheduleUpdateComponent} from "../schedule-update/schedule-update.component";
import {ScheduleCreateComponent} from "../schedule-create/schedule-create.component";
import {MovieService} from "../../../shared/services/movie.service";
import {CinemaService} from "../../../shared/services/cinema.service";
import {RoomService} from "../../../shared/services/room.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  schedules: ScheduleModel[] = [];
  movies = [];
  p: number = 1;
  rooms = [];
  cinemas = [];
  movieNameSearch : string;
  cinemaId : number;
  roomId : number;
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private scheduleService: ScheduleService,
              private cinemaService: CinemaService,
              private roomService: RoomService,
              private movieService: MovieService,
              private eventManagement: EventManagement,
              public modal: NgbModal) { }

  ngOnInit(): void {
    this.movieService.fetch().subscribe(movies => {this.movies = movies;});
    this.cinemaService.fetch().subscribe(cinemas => {this.cinemas = cinemas;});
    this.roomService.fetch().subscribe(rooms => {this.rooms = rooms;});
    this.form = this.fb.group({
      movieName: ['', Validators.required],
      roomId: ['', Validators.required],
      cinemaId: ['', Validators.required],
      startTime: ['', Validators.required],
      movieNameSearch: ['', Validators.required]
    });
    this.loadSchedules();
    this.eventManagement.subscribe('UPDATE_SCHEDULE', () => this.loadSchedules());
  }

  loadSchedules() {
    this.scheduleService.fetch().subscribe(schedules => {
      this.schedules = schedules;
    }, error => console.log(error));
  }
  goToDelete(schedule: ScheduleModel) {
    const modalRef = this.modal.open(ScheduleDeleteComponent);
    modalRef.componentInstance.schedule = schedule;
  }
  goToUpdate(schedule: ScheduleModel) {
    const modalRef = this.modal.open(ScheduleUpdateComponent);
    modalRef.componentInstance.schedule = schedule;
  }

  goToCreate() {
    this.modal.open(ScheduleCreateComponent);
  }
  listMovie(movieId) {
    console.log(movieId);
    if (movieId != -1) {
      this.scheduleService.findByMovie(movieId).subscribe(schedules => {
        this.schedules = schedules;
      }, error => console.log(error));
    }
    else this.loadSchedules();
  }
  listRoom(roomId) {
    if (roomId != -1) {
      this.roomId = roomId;
    }
  }
  listCinema(cinemaId) {
    if (cinemaId != -1) {
      this.roomService.findRoomsByCinema(cinemaId).subscribe(rooms => {
        this.rooms = rooms;
      }, error => console.log(error));
      this.cinemaId = cinemaId;
    }
  }
  getStartTime(startTime){

  }
  searchAdvance() {
    const schedule = this.form.value;
    if(schedule.startTime!=""){
      schedule.startTime = this.form.value.startTime+':00';
    }
    console.log(schedule.startTime+" " +schedule.movieNameSearch+" " +schedule.roomId+" "+ schedule.cinemaId)
    this.scheduleService.search(schedule).subscribe(schedules => {
      this.schedules = schedules;
    }, error => console.log(error));
  }
}
