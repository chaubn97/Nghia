import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SeatTypeModel} from "../../model/seatType.model";
import {ENDPOINT_URL} from "../constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class SeatTypeService {

  constructor(private http: HttpClient) { }
  fetch(): Observable<SeatTypeModel[]> {
    return this.http.get<SeatTypeModel[]>(`${ENDPOINT_URL}/seattype/get-all`);
  }
  findOne(id: any): Observable<SeatTypeModel> {
    return this.http.get<SeatTypeModel>(`${ENDPOINT_URL}/seattype/find-one/${id}`);
  }
}
