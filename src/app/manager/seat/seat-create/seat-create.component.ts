import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CinemaModel} from "../../../model/cinema.model";
import {RoomModel} from "../../../model/room.model";
import {SeatTypeModel} from "../../../model/seatType.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {CinemaService} from "../../../shared/services/cinema.service";
import {RoomService} from "../../../shared/services/room.service";
import {SeatService} from "../../../shared/services/seat.service";
import {SeatTypeService} from "../../../shared/services/seat-type.service";
import {SeatModel} from "../../../model/seat.model";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-seat-create',
  templateUrl: './seat-create.component.html',
  styleUrls: ['./seat-create.component.css']
})
export class SeatCreateComponent implements OnInit {

  form: FormGroup;
  cinema : CinemaModel;
  cinemas = [];
  room : RoomModel;
  seats : SeatModel;
  // seatRow: SeatModel[];
  // seatColumn: SeatModel[];
  rooms = [];
  seatTypes: SeatTypeModel[];
  seatTypeIdList = new Array();
  submitted = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public modal: NgbActiveModal,
              private eventManagement: EventManagement,
              private cinemaService: CinemaService,
              private roomService: RoomService,
              private seatService: SeatService,
              private seatTypeService: SeatTypeService,
              private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
    this.roomService.fetch().subscribe(rooms =>{this.rooms = rooms;});
    this.seatTypeService.fetch().subscribe(seatTypes =>{this.seatTypes = seatTypes;});
    this.form = this.fb.group({
      seatId: [''],
      roomId: ['', Validators.required],
      seatTypeId: ['', Validators.required],
      seatRow: ['', Validators.required],
      seatColumn: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }
  doSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const seat = this.form.value;
    this.seatService.create(seat).subscribe(
        (response) => {

          if(response.responseCode == 2) {
            this.snotifyService.error('Create failed! This seat is duplicated');
          } else {
            this.snotifyService.success('Create success!');
            this.modal.close();
            this.eventManagement.broadcast('UPDATE_SEAT');
          }

        }, error => {
          console.log(error);
          this.snotifyService.error('Create failed!');
        });
  }

}
