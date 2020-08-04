import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomListComponent} from "./room-list/room-list.component";
import {RoomDeleteComponent} from "./room-delete/room-delete.component";
import { RoomUpdateComponent } from './room-update/room-update.component';
import {RoomCreateComponent} from "./room-create/room-create.component";
import {RoomRoutingModule} from "./room-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastyModule} from 'ng2-toasty';
import {SnotifyModule} from "ng-snotify";



@NgModule({
    declarations: [RoomCreateComponent,
        RoomListComponent,
        RoomDeleteComponent,
        RoomUpdateComponent],
    exports: [RoomCreateComponent],
    imports: [
        CommonModule,
        RoomRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        ToastyModule,
        SnotifyModule
    ]
})
export class RoomModule { }
