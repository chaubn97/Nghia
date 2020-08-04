import {ScheduleModel} from "../../model/schedule.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ENDPOINT_URL} from "../constants/app.constants";
import {ResponseModel} from "../../model/response.model";

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    constructor(private http: HttpClient) { }
    fetch(): Observable<ScheduleModel[]> {
        return this.http.get<ScheduleModel[]>(`${ENDPOINT_URL}/schedule/get-all`);
    }

    findOne(id: any): Observable<ScheduleModel> {
        return this.http.get<ScheduleModel>(`${ENDPOINT_URL}/schedule/find-one/${id}`);
    }

    create(product: ScheduleModel): Observable<any> {
        return this.http.post<ScheduleModel>(`${ENDPOINT_URL}/schedule/create`, product);
    }

    update(product: ScheduleModel): Observable<any> {
        return this.http.put(`${ENDPOINT_URL}/schedule/update`, product);
    }

    delete(id: number) {
        return this.http.delete(`${ENDPOINT_URL}/schedule/delete/${id}`);
    }
    findByMovie(movieId: number):Observable<ScheduleModel[]>{
        return this.http.get<ScheduleModel[]>(`${ENDPOINT_URL}/schedule/get-all/${movieId}`)
    }
    check(schedule: ScheduleModel):Observable<ScheduleModel[]>{
        return this.http.post<ScheduleModel[]>(`${ENDPOINT_URL}/schedule/check`, schedule);
    }
    findByCurrentTimeAndMovie(movieId: number):Observable<ScheduleModel[]>{
        return this.http.get<ScheduleModel[]>(`${ENDPOINT_URL}/schedule/current-time/${movieId}`)
    }
    findByCurrentTime():Observable<ScheduleModel[]>{
        return this.http.get<ScheduleModel[]>(`${ENDPOINT_URL}/schedule/current-time/`)
    }
    search(schedule: ScheduleModel): Observable<ScheduleModel[]> {
        return this.http.post<ScheduleModel[]>(`${ENDPOINT_URL}/schedule/advancesearch`,schedule);
    }
}
