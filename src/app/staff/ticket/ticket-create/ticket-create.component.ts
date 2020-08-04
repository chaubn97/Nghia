import {Component, Input, OnInit} from '@angular/core';

import {EventManagement} from "../../../shared/services/event.management";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MovieModel} from "../../../model/movie.model";
import {MovieService} from "../../../shared/services/movie.service";
import {TicketScheduleComponent} from "../ticket-schedule/ticket-schedule.component";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {CustomerModel} from "../../../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

  movies: MovieModel[] = [];
  searchName: string;
  customer: CustomerModel;
  customerId : number;
  p: number = 1;
  @Input() movie : MovieModel;
  constructor(private movieService: MovieService,
              private scheduleService : ScheduleService,
              private router: Router,
              private route: ActivatedRoute,
              private eventManagement: EventManagement,

              public modal: NgbModal) { }

  ngOnInit(): void {
    this.loadMovies();
    this.route.params.subscribe(({customerId}) => { this.customerId = customerId;});
    this.eventManagement.subscribe('UPDATE_MOVIE', () => this.loadMovies());
  }

  searchByName() {
    this.movieService.fetchByName(this.searchName).subscribe(movies => {
      this.movies = movies;
    }, error => console.log(error));
    this.searchName = "";
  }
  loadMovies() {
    this.movieService.fetch().subscribe(movies => {
      this.movies = movies;
    }, error => console.log(error));
  }

  goToSchedule(movie: MovieModel) {
    const modalRef = this.modal.open(TicketScheduleComponent);
    modalRef.componentInstance.movie = movie;
  }
}
