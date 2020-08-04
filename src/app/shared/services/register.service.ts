import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RegisterModel} from "../../model/register.model";
import {ENDPOINT_URL} from "../constants/app.constants";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) { }
    // create(register: RegisterModel): Observable<any>{
    //   return this.http.post<any>(`${ENDPOINT_URL}/register`,register);
    // }
}
