import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {MovieService} from "../../../shared/services/movie.service";
import {GenreService} from "../../../shared/services/genre.service";
import {GenreModel} from "../../../model/genre.model";
import {SnotifyService} from "ng-snotify";


@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  form: FormGroup;
  genres :GenreModel[];
  genreIdList = new Array();
  submitted = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public modal: NgbActiveModal,
              private eventManagement: EventManagement,
              private movieService: MovieService,
              private genreService: GenreService,
              private snotifyService: SnotifyService){ }


  ngOnInit(): void {
    this.loadGenreList();
    this.form = this.fb.group({
      movieName: ['', Validators.required],
      movieYear: ['', [Validators.required,Validators.max(2030),Validators.min(1900)]],
      movieDuration: ['', [Validators.required,Validators.max(150),Validators.min(90)]],
      description: ['', Validators.required]},{
      // validator: this.MustMatch('genreList')
    });
  }
  get f() { return this.form.controls; }
  loadGenreList(){
    this.genreService.fetch().subscribe(genres => {
      this.genres = genres;
    }, error => console.log(error));
  }

  onChange(isChecked: boolean, genreId: string){
    if(isChecked) {
      this.genreIdList.push(genreId);
    } else {
      let index = this.genreIdList.indexOf(genreId);
      this.genreIdList.splice(index,1);
    }
  }

  doSubmit() {
    this.submitted = true;
    if (this.form.invalid || this.genreIdList.length == 0) {
      return;
    }
    const movie = this.form.value;
    movie.genreIds = this.genreIdList;
    this.movieService.create(movie).subscribe(
        () =>{
          this.snotifyService.success('Create success!');
          this.eventManagement.broadcast('UPDATE_MOVIE');
          this.modal.close();
        },
        error => error => {
          console.log(error);
          this.snotifyService.error('Create failed! ');
        });
  }

}
