import { Component, OnInit } from '@angular/core';
import {SeatModel} from "../../../model/seat.model";
import {SeatService} from "../../../shared/services/seat.service";
import {EventManagement} from "../../../shared/services/event.management";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SeatModule} from "../seat.module";
import {SeatUpdateComponent} from "../seat-update/seat-update.component";
import {SeatCreateComponent} from "../seat-create/seat-create.component";
import {SeatDeleteComponent} from "../seat-delete/seat-delete.component";
import {SeatTypeModel} from "../../../model/seatType.model";
import {RoomService} from "../../../shared/services/room.service";
import {CinemaService} from "../../../shared/services/cinema.service";

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent implements OnInit {

  seats: SeatModel[] = [];
  rooms =[];
  cinemas = [];
  p: number = 1;
  constructor(private seatService: SeatService, private eventManagement: EventManagement,
              public modal: NgbModal, private roomService: RoomService, private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.roomService.fetch().subscribe(rooms => {this.rooms= rooms;});
    this.cinemaService.fetch().subscribe(cinemas => {this.cinemas = cinemas;});
    this.loadSeats();
    this.eventManagement.subscribe('UPDATE_SEAT', () => this.loadSeats());
  }
  loadSeats(){
    this.seatService.fetch().subscribe(seats =>{this.seats = seats;}, error => console.log(error));
  }
  gotoDelete(seat: SeatModule) {
    const modalRef = this.modal.open(SeatDeleteComponent);
    modalRef.componentInstance.seat = seat;
  }
  gotoUpdate(seat: SeatModule) {
    const modalRef = this.modal.open(SeatUpdateComponent);
    modalRef.componentInstance.seat = seat;
  }
  gotoCreate() {
    this.modal.open(SeatCreateComponent);
  }
  listroom(roomId) {
    console.log('err ' + roomId);
    if (roomId != -1) {
      this.seatService.findSeatByRoom(roomId).subscribe(ex =>{this.seats = ex;}, error => console.log(error));
    }
    else {
      this.loadSeats();

    }
  }
  listcinema(cinemaId) {
    if (cinemaId != -1) {
      this.roomService.findRoomsByCinema(cinemaId).subscribe(ex =>{this.rooms = ex;}, error => console.log(error));
    }
    else {
      this.loadSeats();
    }
  }
}
