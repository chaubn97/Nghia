import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CinemaService} from "../../../shared/services/cinema.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {CinemaListComponent} from "../cinema-list/cinema-list.component";
import {SnotifyService} from "ng-snotify";

@Component({
    selector: 'app-cinema-update',
    templateUrl: './cinema-update.component.html',
    styleUrls: ['./cinema-update.component.css']
})
export class CinemaUpdateComponent implements OnInit {

    cinema : CinemaModel
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

        this.route.data.subscribe(({cinema}) => {

            this.form.patchValue({
                cinemaId: this.cinema.cinemaId,
                cinemaName: this.cinema.cinemaName,
                address: this.cinema.address,
                shortDes: this.cinema.shortDes
            });

        });
    }
    get f() { return this.form.controls; }
    doSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const cinema = this.form.value;

        this.cinemaService.update(cinema).subscribe(
            () =>{
                this.snotifyService.success('Update success!');
                this.eventManagement.broadcast('UPDATE_CINEMA');
                this.modal.close();
            },
            error =>{
                console.log(error);
                this.snotifyService.error('Update failed! ');
            } );


    }


}
