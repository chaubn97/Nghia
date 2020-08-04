import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {CinemaService} from "../../../shared/services/cinema.service";
import {CustomerService} from "../../../shared/services/customer.service";
import {SnotifyService} from "ng-snotify";

@Component({
    selector: 'app-customer-create',
    templateUrl: './customer-create.component.html',
    styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
    radioGender: string = '';

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                public modal: NgbActiveModal,
                private eventManagement: EventManagement,
                private customerService: CustomerService,
                private snotifyService: SnotifyService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            fullName: ['', Validators.required],
            gender: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            phoneNumber: ['', Validators.required],
        });


    }

    getRadioBtnValue(value: string) {
        this.radioGender = value;
        console.log(this.radioGender);
    }

    doSubmit() {
        const customer = this.form.value;
        customer.gender = this.radioGender;
        this.customerService.create(customer).subscribe(
            () => {
                this.snotifyService.success('Create success!');
                this.eventManagement.broadcast('UPDATE_CUSTOMER');
                this.modal.close();
            },
            error => {
                console.log(error);
                this.snotifyService.error('Create failed!');
            });
    }

}
