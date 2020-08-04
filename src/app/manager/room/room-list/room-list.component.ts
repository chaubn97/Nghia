import { Component, OnInit } from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {RoomModel} from "../../../model/room.model";
import {RoomService} from "../../../shared/services/room.service";
import {RoomDeleteComponent} from "../room-delete/room-delete.component";
import {RoomUpdateComponent} from "../room-update/room-update.component";
import {RoomCreateComponent} from "../room-create/room-create.component";
import {CinemaService} from "../../../shared/services/cinema.service";
import {GenreService} from "../../../shared/services/genre.service";


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms: RoomModel[] = [];
  cinemas = [];
  p: number = 1;

  constructor(private roomService: RoomService,
              private cinemaService: CinemaService,

              private eventManagement: EventManagement,
              public modal: NgbModal) { }

  ngOnInit(): void {
    this.cinemaService.fetch().subscribe(cinemas => {this.cinemas = cinemas;});

    this.loadRooms();
    this.eventManagement.subscribe('UPDATE_ROOM', () => this.loadRooms());
  }

  loadRooms() {
    this.roomService.fetch().subscribe(rooms => {
      this.rooms = rooms;
    }, error => console.log(error));
  }
  goToDelete(room: RoomModel) {
    const modalRef = this.modal.open(RoomDeleteComponent);
    modalRef.componentInstance.room = room;
  }
  goToUpdate(room: RoomModel) {
    const modalRef = this.modal.open(RoomUpdateComponent);
    modalRef.componentInstance.room = room;
  }

  goToCreate() {
    this.modal.open(RoomCreateComponent);
  }
  listCinema(cinemaId) {
    if (cinemaId != -1) {
      this.roomService.findRoomsByCinema(cinemaId).subscribe(rooms => {
        this.rooms = rooms;
      }, error => console.log(error));
    }
    else this.loadRooms();
  }}
