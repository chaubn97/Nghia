import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {CinemaService} from "../../../shared/services/cinema.service";
import {CustomerModel} from "../../../model/customer.model";
import {CustomerService} from "../../../shared/services/customer.service";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customer : CustomerModel;
  form: FormGroup;
  radioGender: string;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public modal: NgbActiveModal,
              private eventManagement: EventManagement,
              private customerService: CustomerService,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: [''],
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.route.data.subscribe(({customer}) => {

      this.form.patchValue({
        customerId: this.customer.customerId,
        fullName: this.customer.fullName,
        gender: this.customer.gender,
        dateOfBirth: this.customer.dateOfBirth,
        phoneNumber: this.customer.phoneNumber,
      });

    });
   }

  getRadioBtnValue(value: string) {
    this.radioGender = value;
    console.log(this.radioGender);
  }
  doSubmit(){
    const customer = this.form.value;
    customer.gender = this.radioGender;
    this.customerService.update(customer).subscribe(
        () =>{
          this.snotifyService.success('Update success!');
          this.eventManagement.broadcast('UPDATE_CUSTOMER');
          this.modal.close();
        },
        error =>{
          console.log(error);
          this.snotifyService.error('Update failed! ');
        } );


  }

}
