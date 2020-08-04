import {Injectable, NgModule} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from "@angular/router";
import {SeatModel} from "../../model/seat.model";
import {SeatService} from "../../shared/services/seat.service";
import {Observable} from "rxjs";
import {SeatListComponent} from "./seat-list/seat-list.component";
import {SeatCreateComponent} from "./seat-create/seat-create.component";
import {SeatUpdateComponent} from "./seat-update/seat-update.component";

@Injectable({providedIn: 'root'})
export class ProductResolver implements Resolve<SeatModel>{
    constructor(private productService: SeatService ) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SeatModel> | Promise<SeatModel> | SeatModel {
        const id = route.params.id ? route.params.id : null;
        return this.productService.findOne(id);
    }
}
const routes: Routes = [
    {
        path: '',
        component: SeatListComponent,
        pathMatch: 'full'
    },
    {
        path: 'create',
        component: SeatCreateComponent,
    },
    {
        path: 'update/:id',
        component: SeatUpdateComponent,
        resolve: {
            product: ProductResolver
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeatRoutingModule {

}
