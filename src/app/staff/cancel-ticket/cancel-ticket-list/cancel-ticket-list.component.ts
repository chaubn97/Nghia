import { Component, OnInit } from '@angular/core';
import {CustomerModel} from "../../../model/customer.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {EventManagement} from "../../../shared/services/event.management";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TicketService} from "../../../shared/services/ticket.service";
import {TicketModel} from "../../../model/ticket.model";
import {tick} from "@angular/core/testing";
import {CancelTicketNotifyComponent} from "../cancel-ticket-notify/cancel-ticket-notify.component";

@Component({
  selector: 'app-cancel-ticket-cancel',
  templateUrl: './cancel-ticket-list.component.html',
  styleUrls: ['./cancel-ticket-list.component.css']
})
export class CancelTicketListComponent implements OnInit {
  tickets: TicketModel[] = [];
  form: FormGroup;
  customerId : number;
  p: number = 1;
  ticketId : number;
  constructor(
      private fb: FormBuilder,private ticketService: TicketService,
      private eventManagement: EventManagement,
      private router: Router,
      private route: ActivatedRoute,
      public modal: NgbModal) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      ticketId: ['', Validators.required],
    });
    this.loadTickets();
    this.eventManagement.subscribe('UPDATE_TICKET', () => this.loadTickets());
  }
  searchById() {
    const ticket: [] = this.form.value;
    this.ticketService.findOne(this.ticketId).subscribe(tickets => {
      this.tickets = tickets;
    }, error => { this.eventManagement.broadcast('UPDATE_TICKET');});
  }


  loadTickets() {
    this.ticketService.fetch().subscribe(tickets => {
      this.tickets = tickets;
    }, error => console.log(error));
  }
  cancelTicket(ticket: TicketModel) {
    const modalRef = this.modal.open(CancelTicketNotifyComponent);
    modalRef.componentInstance.ticket = ticket;
  }


}
