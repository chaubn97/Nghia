import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomModel} from "../../model/room.model";
import {ENDPOINT_URL} from "../constants/app.constants";
import {MovieRevenueModel} from "../../model/movie-revenue.model";
import {CinemaRevenueModel} from "../../model/cinema-revenue.model";
import {ScheduleRevenueModel} from "../../model/schedule-revenue.model";
import {DayRevenueModel} from "../../model/day-revenue.model";

@Injectable({
    providedIn: 'root'
})
export class RevenueService {

    constructor(private http: HttpClient) {
    }

    // getRevenueByMovie(startTime:Date, endTime:Date): Observable<MovieRevenueModel[]> {
    //     const movieRevenueDto = [{startTime: startTime},{endTime: endTime}];
    //     return this.http.get<MovieRevenueModel[]>(`${ENDPOINT_URL}/revenue/get-revenue-by-movie/?movieRevenueDto=`
    //         + encodeURIComponent(JSON.stringify(movieRevenueDto)));
    // }

    getRevenueByMovie(movieRevenue: MovieRevenueModel): Observable<MovieRevenueModel[]> {
        return this.http.post<MovieRevenueModel[]>(`${ENDPOINT_URL}/revenue/get-revenue-by-movie`
           ,movieRevenue);
    }
    getAllRevenueScheduleByMovie(scheduleRevenue : ScheduleRevenueModel): Observable<ScheduleRevenueModel[]> {
        return this.http.post<ScheduleRevenueModel[]>(`${ENDPOINT_URL}/revenue/get-revenue-by-schedule`,scheduleRevenue);
    }
    getRevenueByCinema(cinemaRevenueModel: CinemaRevenueModel): Observable<CinemaRevenueModel[]> {
        return this.http.post<CinemaRevenueModel[]>(`${ENDPOINT_URL}/revenue/get-revenue-by-cinema`
            ,cinemaRevenueModel);
    }
    getRevenueByDay(dayRevenueModel: DayRevenueModel): Observable<DayRevenueModel[]> {
        return this.http.post<DayRevenueModel[]>(`${ENDPOINT_URL}/revenue/get-revenue-by-day`
            ,dayRevenueModel);
    }



}
