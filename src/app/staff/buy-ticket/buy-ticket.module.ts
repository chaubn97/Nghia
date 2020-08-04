import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxPaginationModule} from "ngx-pagination";
import { BuyTicketScheduleComponent } from './buy-ticket-schedule/buy-ticket-schedule.component';
import {BuyTicketRoutingModule} from "./buy-ticket-routing.module";
import { BuyTicketListComponent } from './buy-ticket-list/buy-ticket-list.component';



@NgModule({
    declarations: [

    BuyTicketScheduleComponent,

    BuyTicketListComponent],

    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        BuyTicketRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class BuyTicketModule { }
