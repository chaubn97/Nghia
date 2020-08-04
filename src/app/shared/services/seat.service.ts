import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SeatModel} from "../../model/seat.model";
import {ENDPOINT_URL} from "../constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http: HttpClient) { }
  fetch(): Observable<SeatModel[]> {
    return this.http.get<SeatModel[]>(`${ENDPOINT_URL}/seat/get-all`);
  }
  findSeatByRoom(roomId: number): Observable<SeatModel[]>{
    return this.http.get<SeatModel[]>(`${ENDPOINT_URL}/seat/get-all/${roomId}`);
  }
  findOne(id: any): Observable<SeatModel> {
    return this.http.get<SeatModel>(`${ENDPOINT_URL}/seat/find-one/${id}`);
  }
  create(product: SeatModel):Observable<any> {
    return this.http.post<SeatModel>(`${ENDPOINT_URL}/seat/create`, product);
  }
  update(product: SeatModel):Observable<any> {
    return this.http.put(`${ENDPOINT_URL}/seat/update`, product);
  }
  delete(id: number) {
    return this.http.delete(`${ENDPOINT_URL}/seat/delete/${id}`);
  }
}
