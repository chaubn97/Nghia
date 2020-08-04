import {NgModule} from "@angular/core";
import {SeatCreateComponent} from "./seat-create/seat-create.component";
import {SeatListComponent} from "./seat-list/seat-list.component";
import {SeatDeleteComponent} from "./seat-delete/seat-delete.component";
import {SeatUpdateComponent} from "./seat-update/seat-update.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SeatRoutingModule} from "./seat-routing.module";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
    declarations: [SeatCreateComponent,
        SeatListComponent,
        SeatDeleteComponent,
        SeatUpdateComponent],
    exports: [SeatCreateComponent],
    imports: [CommonModule, SeatRoutingModule, FormsModule, ReactiveFormsModule, NgxPaginationModule
    ]
})
export class SeatModule {

}
