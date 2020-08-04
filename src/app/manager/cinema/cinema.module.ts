import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CinemaRoutingModule} from './cinema-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CinemaCreateComponent} from "./cinema-create/cinema-create.component";
import {CinemaListComponent} from "./cinema-list/cinema-list.component";
import {CinemaDeleteComponent} from "./cinema-delete/cinema-delete.component";
import { CinemaUpdateComponent } from './cinema-update/cinema-update.component';
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [CinemaCreateComponent,
    CinemaListComponent,
    CinemaDeleteComponent,
    CinemaUpdateComponent],
  exports: [CinemaCreateComponent],
    imports: [
        CommonModule,
        CinemaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class CinemaModule { }
