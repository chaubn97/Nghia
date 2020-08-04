import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CinemaService} from "../../../shared/services/cinema.service";
import {CinemaModel} from "../../../model/cinema.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {SnotifyService} from "ng-snotify";

@Component({
    selector: 'app-cinema-create',
    templateUrl: './cinema-create.component.html',
    styleUrls: ['./cinema-create.component.css']
})
export class CinemaCreateComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                public modal: NgbActiveModal,
                private eventManagement: EventManagement,
                private cinemaService: CinemaService,
                private snotifyService: SnotifyService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            cinemaId: [''],
            cinemaName: ['', Validators.required],
            address: ['', Validators.required],
            shortDes: ['', Validators.required]
        });


    }
    get f() { return this.form.controls; }
    doSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const cinema = this.form.value;
        this.cinemaService.create(cinema).subscribe(
            () =>{
                this.snotifyService.success('Create success!');
                this.eventManagement.broadcast('UPDATE_CINEMA');
                this.modal.close();
            },
            error => {
                console.log(error);
                this.snotifyService.error('Create failed!');
            });
    }


}
