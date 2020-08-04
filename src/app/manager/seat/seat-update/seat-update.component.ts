import { Component, OnInit } from '@angular/core';
import {SeatModel} from "../../../model/seat.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {RoomService} from "../../../shared/services/room.service";
import {SeatService} from "../../../shared/services/seat.service";
import {SeatTypeService} from "../../../shared/services/seat-type.service";
import {RoomModel} from "../../../model/room.model";
import {SeatTypeModel} from "../../../model/seatType.model";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-seat-update',
  templateUrl: './seat-update.component.html',
  styleUrls: ['./seat-update.component.css']
})
export class SeatUpdateComponent implements OnInit {

  seat: SeatModel;
  form: FormGroup;
  rooms: RoomModel[];
  seatTypes: SeatTypeModel[];
  submitted = false;
  constructor(private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,
              public modal: NgbActiveModal, private eventManagement: EventManagement,
              private roomService: RoomService,
              private seatService: SeatService, private seatTypeService: SeatTypeService,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.roomService.fetch().subscribe(rooms => { this.rooms = rooms;});
    this.seatTypeService.fetch().subscribe(seatTypes => {this.seatTypes = seatTypes;});
    this.form = this.fb.group({
      seatId: [''],
      roomId: ['', Validators.required],
      seatTypeId: ['', Validators.required],
      seatRow: ['', Validators.required],
      seatColumn: ['', Validators.required]
    });
    this.route.data.subscribe(({seat}) => {
      this.form.patchValue({
        seatId: this.seat.seatId,
        roomId: this.seat.room.roomId,
        seatTypeId: this.seat.seatType.seatTypeId,
        seatRow: this.seat.seatRow,
        seatColumn: this.seat.seatColumn
      });
    });
  }
  get f() { return this.form.controls; }
  doSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const seat = this.form.value;
    this.seatService.update(seat).subscribe(
        (response) => {

          if(response.responseCode == 2) {
            this.snotifyService.error('Update failed! This schedule is duplicated');
          } else {
            this.snotifyService.success('Update success!');
            this.eventManagement.broadcast('UPDATE_SEAT');
            this.modal.close();
          }
        }, error => {
          console.log(error);
          this.snotifyService.error('Update failed!');
        });
  }
}
