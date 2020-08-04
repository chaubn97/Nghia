import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from "./token-storage.service";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuardService implements CanActivate {

  constructor(private token: TokenStorageService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (this.token.getToken()) {
      // for (const role of this.token.getAuthorities()) {
      //   if (role === 'MANAGER') {
      //     return true;
      //   }
      // }
      // let bearer_token = jwt_decode(this.token.getToken());
       let role = this.token.getRole();
        if (role === 'MANAGER') {
          return true;
        }
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      this.router.navigate(['../login']);
      return false;
    }
  }
}
