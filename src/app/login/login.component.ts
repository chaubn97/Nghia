import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceService} from "../shared/services/auth-service.service";
import {TokenStorageService} from "../shared/services/token-storage.service";
import {SignInInfo} from "../model/signin-info";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: string;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  loginForm = new FormGroup({
    managerUsername: new FormControl('', [Validators.required, Validators.minLength(4)]), managerPassword: new FormControl('')
  });
  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthServiceService, private token: TokenStorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      if (this.token.getToken()) {
          this.isLoggedIn = true;
           this.roles = this.token.getAuthorities();
      }
      document.body.classList.add('bg-img');
  }
  reloadPage() {
    window.location.reload();
  }
  signIn() {
    const {managerUsername, managerPassword} = this.loginForm.value;
    // @ts-ignore
    const authLoginInfo = new SignInInfo(managerUsername, managerPassword);
    this.authService.attemptAuth(authLoginInfo).subscribe(
        data => {

            this.token.saveToken(data.id_token);

            let bearer_token = jwt_decode(this.token.getToken());
            let role = bearer_token.auth;
            this.token.saveRole(role);
          // this.token.saveUserId(data.id);
          //   this.token.saveManager(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          // this.roles = this.token.getAuthorities();
            this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          console.log(error);
          this.isLoginFailed = true;
        }
    );
  }
  ngOnDestroy(): void {
      document.body.classList.remove('bg-img');
  }
}
