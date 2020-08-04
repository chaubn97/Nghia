import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_URL} from '../constants/app.constants';
import {Observable} from 'rxjs';
import {CinemaModel} from "../../model/cinema.model";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private http: HttpClient) { }
  fetch(): Observable<CinemaModel[]> {
    return this.http.get<CinemaModel[]>(`${ENDPOINT_URL}/cinema/get-all`);
  }

  findOne(id: any): Observable<CinemaModel> {
    return this.http.get<CinemaModel>(`${ENDPOINT_URL}/cinema/find-one/${id}`);
  }
  search(cinema: CinemaModel): Observable<CinemaModel[]> {
    return this.http.post<CinemaModel[]>(`${ENDPOINT_URL}/cinema/search`,cinema);
  }

  create(product: CinemaModel): Observable<CinemaModel> {
    return this.http.post<CinemaModel>(`${ENDPOINT_URL}/cinema/create`, product);
  }

  update(product: CinemaModel) {
    return this.http.put(`${ENDPOINT_URL}/cinema/update`, product);
  }

  delete(id: number) {
    return this.http.delete(`${ENDPOINT_URL}/cinema/delete/${id}`);
  }
}
