import { Component, OnInit } from '@angular/core';
import {EventManagement} from "../../../shared/services/event.management";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MovieRevenueModel} from "../../../model/movie-revenue.model";
import {RevenueService} from "../../../shared/services/revenue.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CinemaRevenueModel} from "../../../model/cinema-revenue.model";
import {RevenueScheduleComponent} from "../revenue-schedule/revenue-schedule.component";
import {DayRevenueModel} from "../../../model/day-revenue.model";

@Component({
  selector: 'app-revenue-list',
  templateUrl: './revenue-list.component.html',
  styleUrls: ['./revenue-list.component.css']
})
export class RevenueListComponent implements OnInit {
  movieRevenues: MovieRevenueModel[] = [];
    cinemaRevenues: CinemaRevenueModel[] = [];
    dayRevenues: DayRevenueModel[] = [];
  startTime: Date;
  endTime: Date;
  form: FormGroup;
    p: number = 1;
    p1: number = 1;
  constructor(private fb: FormBuilder,
        private revenueService: RevenueService,
              private eventManagement: EventManagement,
              public modal: NgbModal) { }

  ngOnInit(): void {
      this.form = this.fb.group({
          startTime: ['',Validators.required],
          endTime: ['', Validators.required],
      });
  }

  loadMovieRevenues() {
    const movieRevenueDto = this.form.value;
    movieRevenueDto.startTime = this.form.value.startTime + ':00';
      movieRevenueDto.endTime = this.form.value.endTime + ':00';
      this.loadCinemaRevenues();
      this.loadDayRevenues();
    this.revenueService.getRevenueByMovie(movieRevenueDto).subscribe(movieRevenues => {
      this.movieRevenues = movieRevenues;
    }, error => console.log(error));

  }

    loadCinemaRevenues() {
        const cinemaRevenueDto = this.form.value;
        cinemaRevenueDto.startTime = this.form.value.startTime;
        cinemaRevenueDto.endTime = this.form.value.endTime;
        this.revenueService.getRevenueByCinema(cinemaRevenueDto).subscribe(cinemaRevenues => {
            this.cinemaRevenues = cinemaRevenues;
        }, error => console.log(error));
    }

    loadDayRevenues() {
        const  dayRevenueDto = this.form.value;
        dayRevenueDto.startTime = this.form.value.startTime;
        dayRevenueDto.endTime = this.form.value.endTime;
        this.revenueService.getRevenueByDay(dayRevenueDto).subscribe(dayRevenues => {
            this.dayRevenues = dayRevenues;
        }, error => console.log(error));
    }
  goToDetail(movieRevenueDto: MovieRevenueModel) {
    const modalRef = this.modal.open(RevenueScheduleComponent);
    modalRef.componentInstance.movieRevenueDto = movieRevenueDto;
  }


}
