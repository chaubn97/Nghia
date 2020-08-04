import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CinemaService} from "../../../shared/services/cinema.service";
import {EventManagement} from "../../../shared/services/event.management";
import {TicketModel} from "../../../model/ticket.model";

import {CancelTicketModel} from "../../../model/cancel-ticket.model";
import {CancelTicketService} from "../../../shared/services/cancel-ticket-service";
import {SnotifyService} from "ng-snotify";


@Component({
  selector: 'app-cancel-ticket-notify',
  templateUrl: './cancel-ticket-notify.component.html',
  styleUrls: ['./cancel-ticket-notify.component.css']
})
export class CancelTicketNotifyComponent implements OnInit {

  ticket: TicketModel;
  penaltyMoney: number;
  constructor(public modal: NgbActiveModal,
              private cancelTicketService: CancelTicketService,
              private eventManagement: EventManagement,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
      this.cancelTicketService.getPenaltyMoney(this.ticket.ticketId).subscribe(
          (penaltyMoney) => {
            this.penaltyMoney = penaltyMoney;
          }
      );
  }

  delete() {
      var cancelTicket = new CancelTicketModel(this.ticket.ticketId);
    this.cancelTicketService.cancelTicket(cancelTicket).subscribe(
        () => {
            this.snotifyService.success('Cancel ticket success!');
          this.eventManagement.broadcast('UPDATE_TICKET');
          this.modal.close();
        }, error => {
            console.log(error);
            this.snotifyService.success('Cancel ticket failed!');
        }
    );

  }

}
