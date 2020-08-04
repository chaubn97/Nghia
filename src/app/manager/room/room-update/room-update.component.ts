import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {RoomModel} from "../../../model/room.model";
import {RoomService} from "../../../shared/services/room.service";
import {CinemaService} from "../../../shared/services/cinema.service";
import {CinemaModel} from "../../../model/cinema.model";
import {SnotifyService} from "ng-snotify";


@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.css']
})
export class RoomUpdateComponent implements OnInit {

  room : RoomModel;
  form: FormGroup;
  cinemas = [];
  submitted = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public modal: NgbActiveModal,
              private eventManagement: EventManagement,
              private cinemaService : CinemaService,
              private roomService: RoomService,
              private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
    this.cinemaService.fetch().subscribe(cinemas => {this.cinemas = cinemas;});
    this.form = this.fb.group({
      roomId: [''],
      cinemaId: ['', Validators.required],
      roomName: ['', Validators.required],
      seatNum: ['', [Validators.required,Validators.max(50)]],
      type: ['', Validators.required]
    });

    this.route.data.subscribe(({room}) => {

      this.form.patchValue({
        roomId: this.room.roomId,
        cinemaId: this.room.cinema.cinemaId,
        roomName: this.room.roomName,
        seatNum: this.room.seatNum,
        type: this.room.type
      });

    });
  }
  get f() { return this.form.controls; }
  doSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const room = this.form.value;

    this.roomService.update(room).subscribe(
        (response) =>{

          if(response.responseCode == 2) {
            this.snotifyService.error('Update failed! This room is duplicated');
          } else {
            this.snotifyService.success('Update success!');
            this.eventManagement.broadcast('UPDATE_SCHEDULE');
            this.modal.close();
          }
        },
        error => {
          console.log(error);
          this.snotifyService.error('Update failed!');
        }
    );


  }


}
