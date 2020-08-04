import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CancelTicketRoutingModule} from './cancel-ticket-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CancelTicketListComponent } from './cancel-ticket-list/cancel-ticket-list.component';
import { CancelTicketNotifyComponent } from './cancel-ticket-notify/cancel-ticket-notify.component';
import {NgxPaginationModule} from "ngx-pagination";




@NgModule({
  declarations: [
    CancelTicketListComponent,
    CancelTicketNotifyComponent],
  exports: [],
    imports: [
        CommonModule,
        CancelTicketRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class CancelTicketModule { }
