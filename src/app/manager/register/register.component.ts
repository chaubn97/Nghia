
import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../../shared/services/register.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterModel} from "../../model/register.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../shared/services/auth-service.service";
import {CinemaService} from "../../shared/services/cinema.service";
import {CinemaModel} from "../../model/cinema.model";
import {SignupInfoModel} from "../../model/signup-info.model";
import {SnotifyService} from "ng-snotify";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    cinemas : CinemaModel[];
    form: any={};
    registerForm : FormGroup;
    submitted = false;
    roles : [""];

    registers: RegisterModel[]=[] ;
    constructor(private fb: FormBuilder,
                private registerService:RegisterService,
                private cinemaService:CinemaService,
                private router: Router,
                private authService:AuthServiceService,
                private route: ActivatedRoute,
                private snotifyService: SnotifyService
    ) {}

    ngOnInit(): void {
        this.cinemaService.fetch().subscribe(cinemas => {this.cinemas = cinemas})
        this.registerForm = this.fb.group(
            {
                cinemaId: ['',Validators.required],
                managerUsername: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
                managerPassword: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(50)]],
                managerName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
                confirmPassword: ['',Validators.required],
                roles: ['',Validators.required],
            }, {
                validator: MustMatch('managerPassword', 'confirmPassword')
            });
    }
    signUp(){
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        const {cinemaId,managerUsername,managerPassword,managerName,roles} = this.registerForm.value;
        const signupInfoForm = new SignupInfoModel(cinemaId,managerUsername,managerPassword,managerName,roles);
        signupInfoForm.roles.push(this.registerForm.value.roles)
        this.authService.signUp(signupInfoForm).subscribe(
            (resp) => {
                if(resp.responseCode == 2) {
                    this.snotifyService.error(resp.message);

                } else {
                    this.snotifyService.success('Create success!');
                }
            },
            err => {
                this.snotifyService.error('Create failed!');
            }
        )
    }
    get f() {return this.registerForm.controls;}
}
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

