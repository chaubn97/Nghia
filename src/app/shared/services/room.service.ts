import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_URL} from '../constants/app.constants';
import {Observable} from 'rxjs';
import {RoomModel} from "../../model/room.model";

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private http: HttpClient) { }
    fetch(): Observable<RoomModel[]> {
        return this.http.get<RoomModel[]>(`${ENDPOINT_URL}/room/get-all`);
    }

    findOne(id: any): Observable<RoomModel> {
        return this.http.get<RoomModel>(`${ENDPOINT_URL}/room/find-one/${id}`);
    }
    findRoomsByCinema(cinemaId: number): Observable<RoomModel[]>{
        return this.http.get<RoomModel[]>(`${ENDPOINT_URL}/room/getbycinemaid/${cinemaId}`);
    }
    create(room: RoomModel): Observable<any> {
        return this.http.post<any>(`${ENDPOINT_URL}/room/create`, room);
    }

    update(room: RoomModel): Observable<any> {
        return this.http.put<any>(`${ENDPOINT_URL}/room/update`, room);
    }

    delete(id: number) {
        return this.http.delete(`${ENDPOINT_URL}/room/delete/${id}`);
    }
}
