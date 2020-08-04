import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {ScheduleModel} from "../../model/schedule.model";
import {ScheduleService} from "../../shared/services/schedule.service";
import {Observable} from "rxjs";
import {BuyTicketScheduleComponent} from "./buy-ticket-schedule/buy-ticket-schedule.component";
import {TicketListComponent} from "../ticket/ticket-list/ticket-list.component";
import {BuyTicketListComponent} from "./buy-ticket-list/buy-ticket-list.component";


@Injectable({providedIn: 'root'})
export class TicketScheduleResolver implements Resolve<ScheduleModel[]> {
    constructor(private scheduleService: ScheduleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ScheduleModel[]>
        | Promise<ScheduleModel[]> | ScheduleModel[] {
        const movieId = route.params.movieId ? route.params.movieId : null;
        return this.scheduleService.findByCurrentTimeAndMovie(movieId);
    }
}
@Injectable({providedIn: 'root'})
export class TicketListResolver implements Resolve<ScheduleModel> {
    constructor(private scheduleService: ScheduleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ScheduleModel>
        | Promise<ScheduleModel> | ScheduleModel {
        const scheduleId = route.params.scheduleId ? route.params.scheduleId : null;
        return this.scheduleService.findOne(scheduleId);
    }
}

const routes: Routes = [

    {
        path: 'schedule/:movieId',
        component: BuyTicketScheduleComponent,
        resolve:{
            schedules: TicketScheduleResolver
        }
    },
    {
        path: '',
        component: BuyTicketScheduleComponent,
        pathMatch: 'full'
    },
    {
        path: 'ticketlist/:scheduleId',
        component: BuyTicketListComponent,
        resolve:{
            schedule: TicketListResolver
        }
    },
    // {
    //   path: 'detail/:id',
    //   component: ProductCreateComponent,
    //   resolve: {
    //     product: ProductResolver
    //   }
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuyTicketRoutingModule { }
