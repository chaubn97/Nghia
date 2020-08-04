import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {RoomService} from "../../../shared/services/room.service";
import {CinemaService} from "../../../shared/services/cinema.service";
import {CinemaModel} from "../../../model/cinema.model";
import {ToastOptions, ToastyService} from "ng2-toasty";
import {SnotifyService} from "ng-snotify";
import {ResponseModel} from "../../../model/response.model";



@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {
  form: FormGroup;
  cinema : CinemaModel;
  cinemas = [] ;
  submitted = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public modal: NgbActiveModal,
              private eventManagement: EventManagement,
              private roomService: RoomService,
              private cinemaService: CinemaService,
              private snotifyService: SnotifyService
  ) {

  };
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.cinemaService.fetch().subscribe(
        cinemas => {this.cinemas = cinemas;});
    this.form = this.fb.group({
      roomId: [''],
      cinemaId: ['', Validators.required],
      roomName: ['', Validators.required],
      seatNum: ['', [Validators.required,Validators.max(50)]],
      type: ['', Validators.required]
    });


  }


  doSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var toastOptions:ToastOptions = {
      title: "My title",
      msg: "The message",
      showClose: true,
      timeout: 2000,
      theme: 'default',
    }
    const room = this.form.value;
    this.roomService.create(room).subscribe(
        (response) =>{
          this.eventManagement.broadcast('UPDATE_ROOM');
          if(response.responseCode == 2) {
            this.snotifyService.error('Create failed! This room is duplicated');
          } else {
            this.snotifyService.success('Create success!');
            this.modal.close();
          }
        },
        error => {
          console.log(error);
          this.snotifyService.error('Create failed! ');
        });

  }

}
