import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_URL} from '../constants/app.constants';
import {Observable} from 'rxjs';
import {CinemaModel} from "../../model/cinema.model";
import {MovieModel} from "../../model/movie.model";


@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient) { }
    fetch(): Observable<MovieModel[]> {
        return this.http.get<MovieModel[]>(`${ENDPOINT_URL}/movie/get-all`);
    }
    fetchByName(movieName: string): Observable<MovieModel[]> {
        return this.http.get<MovieModel[]>(`${ENDPOINT_URL}/movie/get-all/${movieName}`);
    }
    findOne(id: any): Observable<MovieModel> {
        return this.http.get<MovieModel>(`${ENDPOINT_URL}/movie/find-one/${id}`);
    }

    create(movie: MovieModel): Observable<MovieModel> {
        return this.http.post<MovieModel>(`${ENDPOINT_URL}/movie/create`, movie);
    }

    update(movie: MovieModel) {
        return this.http.put(`${ENDPOINT_URL}/movie/update`, movie);
    }

    delete(id: number) {
        return this.http.delete(`${ENDPOINT_URL}/movie/delete/${id}`);
    }
    search(movie: MovieModel): Observable<MovieModel[]> {
        return this.http.post<MovieModel[]>(`${ENDPOINT_URL}/movie/advancesearch`,movie);
    }
}
