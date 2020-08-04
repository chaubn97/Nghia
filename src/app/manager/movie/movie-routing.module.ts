import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {MovieListComponent} from "./movie-list/movie-list.component";
import {MovieCreateComponent} from "./movie-create/movie-create.component";
import {MovieModel} from "../../model/movie.model";
import {MovieService} from "../../shared/services/movie.service";

@Injectable({providedIn: 'root'})
export class ProductResolver implements Resolve<MovieModel> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieModel>
    | Promise<MovieModel> | MovieModel {
    const id = route.params.id ? route.params.id : null;
    return this.movieService.findOne(id);
  }
}

const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: MovieCreateComponent
  },
  {
    path: 'update/:id',
    component: MovieCreateComponent,
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
export class MovieRoutingModule { }
