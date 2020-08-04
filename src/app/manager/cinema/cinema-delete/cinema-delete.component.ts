import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CinemaService} from "../../../shared/services/cinema.service";
import {EventManagement} from "../../../shared/services/event.management";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-cinema-delete',
  templateUrl: './cinema-delete.component.html',
  styleUrls: ['./cinema-delete.component.css']
})
export class CinemaDeleteComponent implements OnInit {

  cinema: CinemaModel;
  constructor(public modal: NgbActiveModal,
              private cinemaService: CinemaService,
              private eventManagement: EventManagement,
              private snotifyService: SnotifyService) { }

  ngOnInit(): void {

  }

  delete() {
    this.cinemaService.delete(this.cinema.cinemaId).subscribe(
        () => {
          this.eventManagement.broadcast('UPDATE_CINEMA');
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
