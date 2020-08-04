import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignInInfo} from "../../model/signin-info";
import {JwtResponse} from "../../model/JwtResponse";
import {RoomModel} from "../../model/room.model";
import {ENDPOINT_URL} from "../constants/app.constants";
import {ResponseModel} from "../../model/response.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public isAuthorized = false;
  private signUpUrl = 'http://localhost:7070/api/register';
  private loginUrl = 'http://localhost:7070/api/authenticate';
  constructor(private http: HttpClient) {
  }

  signUp(info: SignInInfo): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.signUpUrl, info, httpOptions);
  }

  signIn(info: SignInInfo): Observable<string> {
    return this.http.post<string>(this.loginUrl, info, httpOptions);
  }
  attemptAuth(credentials: SignInInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, {
      managerUsername: credentials.managerUsername,
      managerPassword: credentials.managerPassword
    }, httpOptions);

  }


}
