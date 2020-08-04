import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CinemaService} from "../../../shared/services/cinema.service";
import {EventManagement} from "../../../shared/services/event.management";
import {MovieModel} from "../../../model/movie.model";
import {MovieService} from "../../../shared/services/movie.service";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.css']
})
export class MovieDeleteComponent implements OnInit {

  movie: MovieModel;
  constructor(public modal: NgbActiveModal,
              private movieService: MovieService,
              private eventManagement: EventManagement,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
  }

  delete() {
    this.movieService.delete(this.movie.movieId).subscribe(
        () => {
          this.eventManagement.broadcast('UPDATE_MOVIE');
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
