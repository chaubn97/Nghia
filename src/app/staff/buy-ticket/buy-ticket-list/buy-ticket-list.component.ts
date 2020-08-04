import { Component, OnInit } from '@angular/core';
import {SeatModel} from "../../../model/seat.model";
import {ScheduleModel} from "../../../model/schedule.model";
import {FormBuilder} from "@angular/forms";
import {TicketService} from "../../../shared/services/ticket.service";
import {EventManagement} from "../../../shared/services/event.management";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SnotifyService} from "ng-snotify";
import {TicketModel} from "../../../model/ticket.model";
import {SeatService} from "../../../shared/services/seat.service";

@Component({
  selector: 'app-buy-ticket-list',
  templateUrl: './buy-ticket-list.component.html',
  styleUrls: ['./buy-ticket-list.component.scss']
})
export class BuyTicketListComponent implements OnInit {
  seats: SeatModel[] = [];
  busySeats: SeatModel[] = [];
  seatIds: number[] =[];
  schedule : ScheduleModel;
  customerId:number;
  seatBill: SeatModel[] = [];
  totalPrice : number;
  constructor(private fb: FormBuilder,
              private ticketService: TicketService,
              private seatService: SeatService,
              private eventManagement: EventManagement,
              private router: Router,
              private route: ActivatedRoute,
              public modal: NgbModal,private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(({schedule}) => { this.schedule = schedule;});
    this.route.params.subscribe(({customerId}) => { this.customerId = customerId;});
    this.totalPrice = this.schedule.priceMovie;
    this.eventManagement.subscribe('UPDATE_TICKET', () => this.loadSeats());
    this.loadSeats();
  }
  loadSeats() {


    this.ticketService.getAllSeatByScheduleId(this.schedule.scheduleId)
        .subscribe(seats => {


          this.seats = seats;
        }, error => console.log(error));

  }
  loadBusySeats(){

  }
  getSeatClass(status: boolean){
    if(status) {
      return 'seatactive';
    }
    return 'seat';
  }
  changeStatus(seat : SeatModel){
    seat.chosen = !seat.chosen;
    if(seat.chosen == true) {
      this.seatIds.push(seat.seatId);
      this.seatBill.push(seat);
      this.totalPrice += seat.seatType.seatPrice;
    } else {
      let index = this.seatIds.indexOf(seat.seatId);
      this.seatIds.splice(index,1);
      let indexbill = this.seatBill.indexOf(seat);
      this.seatBill.splice(indexbill,1);
      this.totalPrice -= seat.seatType.seatPrice;
    }

  }

  buyTicket(){
    var today = new Date();
    var currentDate= new Date(today.getFullYear(),(today.getMonth()+1),today.getDate(),
        today.getHours(),today.getMinutes(),today.getSeconds(),0);
    //dien not may cai truyen vao
    var ticket = new TicketModel(1,null
        ,this.seatIds,this.schedule.scheduleId,currentDate,'Active');//cinemaid,customerid,listghe,scheduleId,curentdate
    // ticket.cinema['cinemaId'] = 1;
    // ticket.customer['customerId'] = 1;
    // ticket.schedule['scheduleId'] = 62;
    // ticket['seatIds'] = this.seatIds;
    // ticket['bookingTime'] = currentDate;


    this.ticketService.create(ticket).subscribe(
        () =>{
          // this.eventManagement.broadcast('UPDATE_TICKET');

          this.loadSeats();
          this.snotifyService.success('Buy ticket success!');
          this.seatIds = [];
        },
        error => {
          console.log(error);
          this.snotifyService.error('Buy ticket failed!');
        });
    this.seatBill = [];
    this.totalPrice = 0;
  }

}
