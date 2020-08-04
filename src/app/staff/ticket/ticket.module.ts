import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketRoutingModule} from './ticket-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import {TicketScheduleComponent} from "./ticket-schedule/ticket-schedule.component";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    CustomerDeleteComponent,
    TicketCreateComponent,
    TicketListComponent,
    TicketScheduleComponent
    ],

  exports: [],
    imports: [
        CommonModule,
        TicketRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class TicketModule { }
