import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_URL} from '../constants/app.constants';
import {Observable} from 'rxjs';
import {GenreModel} from "../../model/genre.model";


@Injectable({
    providedIn: 'root'
})
export class GenreService {

    constructor(private http: HttpClient) { }
    fetch(): Observable<GenreModel[]> {
        return this.http.get<GenreModel[]>(`${ENDPOINT_URL}/genre/get-all`);
    }

    findOne(id: any): Observable<GenreModel> {
        return this.http.get<GenreModel>(`${ENDPOINT_URL}/genre/find-one/${id}`);
    }

    create(genre: GenreModel): Observable<GenreModel> {
        return this.http.post<GenreModel>(`${ENDPOINT_URL}/genre/create`, genre);
    }

    update(genre: GenreModel) {
        return this.http.put(`${ENDPOINT_URL}/genre/update`, genre);
    }

    delete(id: number) {
        return this.http.delete(`${ENDPOINT_URL}/genre/delete/${id}`);
    }
}
