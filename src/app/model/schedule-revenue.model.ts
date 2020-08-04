export class ScheduleRevenueModel {
    movieId : number;
    scheduleId: number
    roomName: String;
    startTime: Date;
    endTime: Date;
    totalMoney: number;
    constructor(movieId : number,startTime : Date, endTime : Date) {
        this.movieId = movieId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
