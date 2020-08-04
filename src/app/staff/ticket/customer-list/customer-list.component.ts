import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {CinemaService} from "../../../shared/services/cinema.service";
import {EventManagement} from "../../../shared/services/event.management";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CinemaDeleteComponent} from "../../../manager/cinema/cinema-delete/cinema-delete.component";
import {CinemaUpdateComponent} from "../../../manager/cinema/cinema-update/cinema-update.component";
import {CinemaCreateComponent} from "../../../manager/cinema/cinema-create/cinema-create.component";
import {CustomerModel} from "../../../model/customer.model";
import {CustomerService} from "../../../shared/services/customer.service";
import {CustomerDeleteComponent} from "../customer-delete/customer-delete.component";
import {CustomerUpdateComponent} from "../customer-update/customer-update.component";
import {CustomerCreateComponent} from "../customer-create/customer-create.component";
import {MovieModel} from "../../../model/movie.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: CustomerModel[] = [];
  customersByName: CustomerModel[] = [];
  searchName: string;
  form: FormGroup;
  customerId : number;
  p: number = 1;

  constructor(
      private fb: FormBuilder,private customerService: CustomerService,
              private eventManagement: EventManagement,
      private router: Router,
      private route: ActivatedRoute,
              public modal: NgbModal) { }

  ngOnInit(): void {
    this.loadCustomer();
    this.form = this.fb.group({
      fullName: ['',Validators.required],
    });
    this.eventManagement.subscribe('UPDATE_CUSTOMER', () => this.loadCustomer());
  }
  searchByName() {
    const customer = this.form.value;
    customer.fullName = this.searchName;
    this.customerService.fetchByName(customer).subscribe(cus => {
      this.customers = cus;
    }, error => console.log(error));
  }

  loadCustomer() {
    this.customerService.fetch().subscribe(customers => {
      this.customers = customers;
    }, error => console.log(error));
  }
  goToDelete(customer: CustomerModel) {
    const modalRef = this.modal.open(CustomerDeleteComponent);
    modalRef.componentInstance.customer = customer;
  }
  goToUpdate(customer: CustomerModel) {
    const modalRef = this.modal.open(CustomerUpdateComponent);
    modalRef.componentInstance.customer = customer;
  }

  goToCreate() {
    this.modal.open(CustomerCreateComponent);
  }
  goToMovie(customerId: number) {
    this.router.navigate(['create',{customerId : customerId}]);
  }
}
