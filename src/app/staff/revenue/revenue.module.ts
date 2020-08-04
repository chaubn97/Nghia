import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RevenueListComponent } from './revenue-list/revenue-list.component';
import {RevenueRoutingModule} from "./revenue-routing.module";
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxPaginationModule} from "ngx-pagination";
import { RevenueScheduleComponent } from './revenue-schedule/revenue-schedule.component';




@NgModule({
  declarations: [
    RevenueListComponent,
    RevenueScheduleComponent],
  exports: [],
    imports: [
        CommonModule,
        RevenueRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,

    ]
})
export class RevenueModule { }
