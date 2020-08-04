export class SeatModel {
    roomId: number;
    seatId?: number;
    seatRow: string;
    seatColumn: number;
    room: any;
    seatType: any;
    seatTypeId: number;
    seatTypeName: string;
    seatPrice: number;
    status: boolean ;
    seatStatus: boolean; // load from backend
    chosen: boolean = false;

}
