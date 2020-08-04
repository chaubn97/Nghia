import { Component, OnInit } from '@angular/core';
import {SeatModule} from "../seat.module";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SeatService} from "../../../shared/services/seat.service";
import {EventManagement} from "../../../shared/services/event.management";
import {SeatModel} from "../../../model/seat.model";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-seat-delete',
  templateUrl: './seat-delete.component.html',
  styleUrls: ['./seat-delete.component.css']
})
export class SeatDeleteComponent implements OnInit {
  seat: SeatModel;
  constructor(private modal: NgbActiveModal,
              private seatService: SeatService,
              private eventManagement: EventManagement,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {
  }
  delete() {
    this.seatService.delete(this.seat.seatId).subscribe(
        () => {
          this.eventManagement.broadcast('UPDATE_SEAT');
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
