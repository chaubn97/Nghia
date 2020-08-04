import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {ScheduleModel} from "../../model/schedule.model";
import {ScheduleService} from "../../shared/services/schedule.service";
import {ScheduleListComponent} from "./schedule-list/schedule-list.component";
import {ScheduleCreateComponent} from "./schedule-create/schedule-create.component";



@Injectable({providedIn: 'root'})
export class ScheduleResolver implements Resolve<ScheduleModel> {
    constructor(private scheduleService: ScheduleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ScheduleModel>
        | Promise<ScheduleModel> | ScheduleModel {
        const id = route.params.id ? route.params.id : null;
        return this.scheduleService.findOne(id);
    }
}

const routes: Routes = [
    {
        path: '',
        component: ScheduleListComponent,
        pathMatch: 'full'
    },
    {
        path: 'create',
        component: ScheduleCreateComponent
    },
    {
        path: 'update/:id',
        component: ScheduleCreateComponent,
        resolve: {
            room: ScheduleResolver
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
export class ScheduleRoutingModule { }
