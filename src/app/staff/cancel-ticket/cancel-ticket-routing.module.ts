import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {CinemaModel} from "../../model/cinema.model";
import {CinemaService} from "../../shared/services/cinema.service";

import {CancelTicketListComponent} from "./cancel-ticket-list/cancel-ticket-list.component";



const routes: Routes = [
  {
    path: '',
    component: CancelTicketListComponent,
    pathMatch: 'full'
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
export class CancelTicketRoutingModule { }
