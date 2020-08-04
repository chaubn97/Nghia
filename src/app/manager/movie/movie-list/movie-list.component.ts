import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {CinemaService} from "../../../shared/services/cinema.service";
import {EventManagement} from "../../../shared/services/event.management";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CinemaDeleteComponent} from "../../cinema/cinema-delete/cinema-delete.component";
import {CinemaUpdateComponent} from "../../cinema/cinema-update/cinema-update.component";
import {CinemaCreateComponent} from "../../cinema/cinema-create/cinema-create.component";
import {MovieModel} from "../../../model/movie.model";
import {MovieService} from "../../../shared/services/movie.service";
import {MovieDeleteComponent} from "../movie-delete/movie-delete.component";
import {MovieUpdateComponent} from "../movie-update/movie-update.component";
import {MovieCreateComponent} from "../movie-create/movie-create.component";
import {SearchModel} from "../../../model/search.model";
import {GenreService} from "../../../shared/services/genre.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movie:MovieModel;
  movies: MovieModel[] = [];
  searchName: string;
  searchMovie: SearchModel;
  p: number = 1;
  genres = [];
  form: FormGroup;
  genreIdList : String[];
  movieYear: string;
  movieName: string;
  genreSearch : string;

  constructor(private fb: FormBuilder,
              private movieService: MovieService,
              private genreService: GenreService,
              private eventManagement: EventManagement,
              public modal: NgbModal) { }

  ngOnInit(): void {
    this.genreService.fetch().subscribe(genres => {this.genres = genres;});
    this.loadMovies();
    this.form = this.fb.group({
      movieName: ['',Validators.required],
      genreSearch: ['',Validators.required],
      movieYear: ['',Validators.required],
    });
    this.eventManagement.subscribe('UPDATE_MOVIE', () => this.loadMovies());
  }
  type(movieType){
    this.genreSearch = movieType;
    console.log(this.genreSearch);
  }
  searchAdvance() {
    const movie = this.form.value;
    movie.movieName = this.movieName;
    movie.genreSearch = this.genreSearch;
    movie.movieYear = this.movieYear;
    this.movieService.search(movie).subscribe(movies => {
      this.movies = movies;
    }, error => console.log(error));
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
  goToDelete(movie: MovieModel) {
    const modalRef = this.modal.open(MovieDeleteComponent);
    modalRef.componentInstance.movie = movie;
  }
  goToUpdate(movie: MovieModel) {
    const modalRef = this.modal.open(MovieUpdateComponent);
    modalRef.componentInstance.movie = movie;
  }

  goToCreate() {
    this.modal.open(MovieCreateComponent);
  }
}
