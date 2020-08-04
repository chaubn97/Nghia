import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CinemaService} from "../../../shared/services/cinema.service";
import {EventManagement} from "../../../shared/services/event.management";
import {CustomerModel} from "../../../model/customer.model";
import {CustomerService} from "../../../shared/services/customer.service";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  customer: CustomerModel;
  constructor(public modal: NgbActiveModal,
              private customerService: CustomerService,
              private eventManagement: EventManagement,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {

  }

  delete() {
    this.customerService.delete(this.customer.customerId).subscribe(
        () => {
          this.eventManagement.broadcast('UPDATE_CUSTOMER');
          this.modal.close();
            this.snotifyService.success('Delete success!');
        }, error => {
            console.log(error);
            this.snotifyService.error('Delete failed! ');
            this.modal.close();
        }
    );

  }

}
