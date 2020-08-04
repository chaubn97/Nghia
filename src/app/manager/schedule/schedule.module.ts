import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScheduleCreateComponent} from "./schedule-create/schedule-create.component";
import {ScheduleListComponent} from "./schedule-list/schedule-list.component";
import {ScheduleDeleteComponent} from "./schedule-delete/schedule-delete.component";
import {ScheduleUpdateComponent} from "./schedule-update/schedule-update.component";
import {ScheduleRoutingModule} from "./schedule-routing.module";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2OrderModule} from "ng2-order-pipe";




@NgModule({
    declarations: [ScheduleCreateComponent,
        ScheduleListComponent,
        ScheduleDeleteComponent,
        ScheduleUpdateComponent],
    exports: [ScheduleCreateComponent],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        Ng2OrderModule
    ]
})
export class ScheduleModule { }
