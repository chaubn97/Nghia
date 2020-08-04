import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {TicketCreateComponent} from "./ticket-create/ticket-create.component";
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {ScheduleModel} from "../../model/schedule.model";
import {ScheduleService} from "../../shared/services/schedule.service";
import {Observable} from "rxjs";
import {TicketScheduleComponent} from "./ticket-schedule/ticket-schedule.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";

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
    path: '',
    component: CustomerListComponent,
    pathMatch: 'full'
  },
  {
    path: 'create/:customerId',
    component: TicketCreateComponent
  },
  {
    path: 'ticketlist/:scheduleId/:customerId',
    component: TicketListComponent,
    resolve:{
      schedule: TicketListResolver
    }
  },
  {
    path: 'ticket-schedule/:movieId/:customerId',
    component: TicketScheduleComponent,
    resolve:{
      schedules: TicketScheduleResolver
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
export class TicketRoutingModule { }
