import { Component, OnInit } from '@angular/core';
import {CinemaModel} from "../../../model/cinema.model";
import {CinemaService} from "../../../shared/services/cinema.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManagement} from "../../../shared/services/event.management";
import {CinemaDeleteComponent} from "../cinema-delete/cinema-delete.component";
import {CinemaCreateComponent} from "../cinema-create/cinema-create.component";
import {CinemaUpdateComponent} from "../cinema-update/cinema-update.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.css']
})
export class CinemaListComponent implements OnInit {

  cinemas: CinemaModel[] = [];
  p: number = 1;
  searchName: string;
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private cinemaService: CinemaService,
              private eventManagement: EventManagement,
              public modal: NgbModal) { }

  ngOnInit(): void {
    this.loadCinemas();
    this.form = this.fb.group({
      cinemaName: ['',Validators.required],
    });
    this.eventManagement.subscribe('UPDATE_CINEMA', () => this.loadCinemas());
  }
  searchByName() {
    const cinema = this.form.value;
    cinema.cinemaName = this.searchName;
    this.cinemaService.search(cinema).subscribe(cinemas => {
      this.cinemas = cinemas;
    }, error => console.log(error));
  }
  loadCinemas() {
    this.cinemaService.fetch().subscribe(cinemas => {
      this.cinemas = cinemas;
    }, error => console.log(error));
  }
  goToDelete(cinema: CinemaModel) {
    const modalRef = this.modal.open(CinemaDeleteComponent);
    modalRef.componentInstance.cinema = cinema;
  }
  goToUpdate(cinema: CinemaModel) {
    const modalRef = this.modal.open(CinemaUpdateComponent);
    modalRef.componentInstance.cinema = cinema;
  }

  goToCreate() {
    this.modal.open(CinemaCreateComponent);
  }

}
