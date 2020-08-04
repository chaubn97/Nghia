import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {EventManagement} from "../../../shared/services/event.management";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TicketService} from "../../../shared/services/ticket.service";
import {SeatModel} from "../../../model/seat.model";
import {TicketModel} from "../../../model/ticket.model";
import {ScheduleModel} from "../../../model/schedule.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  seats: SeatModel[] = [];
  busySeats: SeatModel[] = [];
    seatIds: number[] =[];
    schedule : ScheduleModel;
    customerId:number;
  constructor(
      private fb: FormBuilder,
      private ticketService: TicketService,
      private eventManagement: EventManagement,
      private router: Router,
      private route: ActivatedRoute,
      public modal: NgbModal,private snotifyService: SnotifyService) { }

  ngOnInit(): void {

      this.route.data.subscribe(({schedule}) => { this.schedule = schedule;});
      this.route.params.subscribe(({customerId}) => { this.customerId = customerId;});

      this.eventManagement.subscribe('UPDATE_TICKET', () => this.loadSeats());
      this.eventManagement.broadcast('UPDATE_TICKET');

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
          console.log("luu: " + seat.seatId);
      } else {
          let index = this.seatIds.indexOf(seat.seatId);
          this.seatIds.splice(index,1);
          console.log("xoa: " + seat.seatId);
      }

  }

  buyTicket(){
      if(this.seatIds.length ==0) return;
      var today = new Date();
      var currentDate= new Date(today.getFullYear(),(today.getMonth()),today.getDate(),
          today.getHours(),today.getMinutes(),today.getSeconds(),0);
        //dien not may cai truyen vao
      var ticket = new TicketModel(1,this.customerId
          ,this.seatIds,this.schedule.scheduleId,currentDate,'Active');//cinemaid,customerid,listghe,scheduleId,curentdate
      // ticket.cinema['cinemaId'] = 1;
      // ticket.customer['customerId'] = 1;
      // ticket.schedule['scheduleId'] = 62;
      // ticket['seatIds'] = this.seatIds;
      // ticket['bookingTime'] = currentDate;

      this.ticketService.create(ticket).subscribe(
          () =>{

              this.snotifyService.success('Buy ticket success!');
              this.seatIds = [];
              this.eventManagement.broadcast('UPDATE_TICKET');
          },
          error => {
              console.log(error);
              this.snotifyService.error('Buy ticket failed!');
          });
  }



}
