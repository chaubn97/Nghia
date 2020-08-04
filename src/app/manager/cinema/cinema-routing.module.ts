import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {CinemaModel} from "../../model/cinema.model";
import {CinemaService} from "../../shared/services/cinema.service";
import {CinemaListComponent} from "./cinema-list/cinema-list.component";
import {CinemaCreateComponent} from "./cinema-create/cinema-create.component";

@Injectable({providedIn: 'root'})
export class ProductResolver implements Resolve<CinemaModel> {
  constructor(private productService: CinemaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CinemaModel>
    | Promise<CinemaModel> | CinemaModel {
    const id = route.params.id ? route.params.id : null;
    return this.productService.findOne(id);
  }
}

const routes: Routes = [
  {
    path: '',
    component: CinemaListComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CinemaCreateComponent
  },
  {
    path: 'update/:id',
    component: CinemaCreateComponent,
    resolve: {
      product: ProductResolver
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
export class CinemaRoutingModule { }
