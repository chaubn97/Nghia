import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketModel} from "../../model/ticket.model";
import {ENDPOINT_URL} from "../constants/app.constants";
import {SeatModel} from "../../model/seat.model";
import {CancelTicketModel} from "../../model/cancel-ticket.model";
import {CustomerModel} from "../../model/customer.model";

@Injectable({
    providedIn: 'root'
})
export class CancelTicketService {

    constructor(private http: HttpClient) { }

    cancelTicket(cancelTicket: CancelTicketModel): Observable<SeatModel[]>{
        return this.http.post<SeatModel[]>(`${ENDPOINT_URL}/cancelticket/create`,cancelTicket);
    }

    getPenaltyMoney(ticketId: any): Observable<number> {
        return this.http.get<number>(`${ENDPOINT_URL}/cancelticket/get/${ticketId}`);
    }

}
