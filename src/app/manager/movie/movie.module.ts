import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDeleteComponent } from './movie-delete/movie-delete.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { MovieRoutingModule} from "./movie-routing.module";
import {NgxPaginationModule} from "ngx-pagination";




@NgModule({
  declarations: [
    MovieCreateComponent,
    MovieDeleteComponent,
    MovieListComponent,
    MovieUpdateComponent],
  exports: [MovieCreateComponent],
    imports: [
        CommonModule,
        MovieRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class MovieModule { }
