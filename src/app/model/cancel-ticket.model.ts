export class CancelTicketModel {
    cancelTicketId: number;
    ticket: any;
    ticketId: number;
    cancelTime: Date;
    constructor(ticketId: number) {
        this.ticketId = ticketId;
    }
    penaltyMoney: any;
}
