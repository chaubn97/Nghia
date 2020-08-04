import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_URL} from '../constants/app.constants';
import {Observable} from 'rxjs';
import {CustomerModel} from "../../model/customer.model";
import {MovieModel} from "../../model/movie.model";


@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }
    fetch(): Observable<CustomerModel[]> {
        return this.http.get<CustomerModel[]>(`${ENDPOINT_URL}/customer/get-all`);
    }
    fetchByName(customer: CustomerModel): Observable<CustomerModel[]> {
        return this.http.post<CustomerModel[]>(`${ENDPOINT_URL}/customer/get-all-by-name`,customer);
    }
    findOne(id: any): Observable<CustomerModel> {
        return this.http.get<CustomerModel>(`${ENDPOINT_URL}/customer/find-one/${id}`);
    }

    create(customer: CustomerModel): Observable<CustomerModel> {
        return this.http.post<CustomerModel>(`${ENDPOINT_URL}/customer/create`, customer);
    }

    update(customer: CustomerModel) {
        return this.http.put(`${ENDPOINT_URL}/customer/update`, customer);
    }

    delete(id: number) {
        return this.http.delete(`${ENDPOINT_URL}/customer/delete/${id}`);
    }
}
