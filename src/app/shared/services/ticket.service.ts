
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ENDPOINT_URL} from "../constants/app.constants";
import {TicketModel} from "../../model/ticket.model";
import {RoomModel} from "../../model/room.model";
import {SeatModel} from "../../model/seat.model";
import {CinemaModel} from "../../model/cinema.model";

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    constructor(private http: HttpClient) { }
    fetch(): Observable<TicketModel[]> {
        return this.http.get<TicketModel[]>(`${ENDPOINT_URL}/ticket/get-all`);
    }

    create(ticket: TicketModel): Observable<TicketModel> {
        return this.http.post<TicketModel>(`${ENDPOINT_URL}/ticket/create`, ticket);
    }
    getAllTicketsByCustomerId(customerId: number): Observable<TicketModel[]>{
        return this.http.get<TicketModel[]>(`${ENDPOINT_URL}/ticket/get-all/${customerId}`);
    }


    getAllSeatByScheduleId(scheduleId: number): Observable<SeatModel[]>{
        return this.http.get<SeatModel[]>(`${ENDPOINT_URL}/seat/get-all-by-scheduleId/${scheduleId}`);
    }

    getAllActiveSeatByScheduleId(scheduleId: number): Observable<SeatModel[]>{
        return this.http.get<SeatModel[]>(`${ENDPOINT_URL}/seat/get-all-active-by-scheduleId/${scheduleId}`);
    }
    findOne(id: any): Observable<TicketModel[]> {
        return this.http.get<TicketModel[]>(`${ENDPOINT_URL}/ticket/find-one/${id}`);
    }



}
