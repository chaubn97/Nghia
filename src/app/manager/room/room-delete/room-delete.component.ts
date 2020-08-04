import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {RoomService} from "../../../shared/services/room.service";
import {RoomModel} from "../../../model/room.model";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.css']
})
export class RoomDeleteComponent implements OnInit {

  room: RoomModel;
  constructor(public modal: NgbActiveModal,
              private roomService: RoomService,
              private eventManagement: EventManagement,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
  }

  delete() {
    this.roomService.delete(this.room.roomId).subscribe(
        () => {
          this.eventManagement.broadcast('UPDATE_ROOM');
            this.snotifyService.success('Delete success!');
          this.modal.close();
        }, error => {
            console.log(error);
            this.snotifyService.error('Delete failed! ');
            this.modal.close();
        }
    );

  }

}
