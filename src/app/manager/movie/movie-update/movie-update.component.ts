import {Component, OnInit} from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {CinemaService} from "../../../shared/services/cinema.service";
import {MovieService} from "../../../shared/services/movie.service";
import {MovieModel} from "../../../model/movie.model";
import {GenreService} from "../../../shared/services/genre.service";
import {GenreModel} from "../../../model/genre.model";
import {SnotifyService} from "ng-snotify";

@Component({
    selector: 'app-movie-update',
    templateUrl: './movie-update.component.html',
    styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {

    movie: MovieModel;
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
                private genreService : GenreService,
                private snotifyService: SnotifyService) {
    }

    ngOnInit(): void {
        this.loadGenreList();
        this.form = this.fb.group({
            movieId: ['',Validators.required],
            movieName: ['', Validators.required],
            movieYear: ['', Validators.required],
            movieDuration: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.route.data.subscribe(({movie}) => {

            this.form.patchValue({
                movieId: this.movie.movieId,
                movieName: this.movie.movieName,
                movieYear: this.movie.movieYear,
                movieDuration: this.movie.movieDuration,
                description: this.movie.description
            });

        });

    }

    loadGenreList(){
        this.genreService.fetch().subscribe(genres => {
            this.genres = genres;

                this.movie.genreList.forEach(movieGen => {
                    genres.forEach(genre => {
                    if(genre.genreId == movieGen.genreId) {
                        genre.haveGenre = true;
                        this.genreIdList.push(genre.genreId);

                    }
                })
            })
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
    get f() { return this.form.controls; }
    doSubmit() {
        this.submitted = true;
        if (this.form.invalid || this.genreIdList.length == 0) {
            return;
        }
        const movie = this.form.value;
        movie.genreIds = this.genreIdList;
        this.movieService.update(movie).subscribe(
            () => {
                this.eventManagement.broadcast('UPDATE_MOVIE');
                this.modal.close();
                this.snotifyService.success('Update success!');
            },
            error =>{
                console.log(error);
                this.snotifyService.error('Update failed! ');
            } );
    }

}
