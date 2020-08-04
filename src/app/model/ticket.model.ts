export class TicketModel {
    cinema: any;
    cinemaId: number;
    customer: any;
    customerId: number;
    seatIds : any[];
    schedule: any;
    scheduleId : number;
    seat:any;
    ticketId: number;
    bookingTime: Date;
    ticketStatus:string;

    constructor(cinemaId: number,customerId: number,seatIds : any[], scheduleId : number,bookingTime: Date, ticketStatus:string){
        this.cinemaId = cinemaId;
        this.customerId = customerId;
        this.seatIds = seatIds;
        this.scheduleId = scheduleId;
        this.bookingTime = bookingTime;
        this.ticketStatus = ticketStatus;
    }
}
