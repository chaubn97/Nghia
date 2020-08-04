import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {RoomModel} from "../../model/room.model";
import {RoomService} from "../../shared/services/room.service";
import {RoomListComponent} from "./room-list/room-list.component";
import {RoomCreateComponent} from "./room-create/room-create.component";


@Injectable({providedIn: 'root'})
export class RoomResolver implements Resolve<RoomModel> {
    constructor(private productService: RoomService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoomModel>
        | Promise<RoomModel> | RoomModel {
        const id = route.params.id ? route.params.id : null;
        return this.productService.findOne(id);
    }
}

const routes: Routes = [
    {
        path: '',
        component: RoomListComponent,
        pathMatch: 'full'
    },
    {
        path: 'create',
        component: RoomCreateComponent
    },
    {
        path: 'update/:id',
        component: RoomCreateComponent,
        resolve: {
            room: RoomResolver
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
export class RoomRoutingModule { }
