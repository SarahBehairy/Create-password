import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss']
  })
export class SignupPage implements OnInit{
    secondValidator: boolean;
    passForm: FormGroup;
    firstValidator: boolean;
    showPassword: boolean;


    constructor(){
      this.charNumValidator  = this.charNumValidator.bind(this)
      this.numberAndSymbolValidator = this.numberAndSymbolValidator.bind(this);
      this.isInputFilled = this.isInputFilled.bind(this);
    }

    ngOnInit(): void{
      this.initVariables();
      this.intiPageForm();
    }

    initVariables():void{
      this.firstValidator = false;
      this.secondValidator = false;
      this.showPassword = false;
    }

    intiPageForm():void{
        this.passForm = new FormGroup({
         password : new FormControl("", {
                updateOn: 'change',
                validators: [Validators.required, this.charNumValidator, this.numberAndSymbolValidator]
            })
        })
    }

    numberAndSymbolValidator(control: FormControl): {[key: string]: boolean} | null {
      if (! control.value || control.value== '' ) return {"first": false}
      const pattern1 = new RegExp('(?=.*[!_*@#$%^&+=])');
      const pattern2 = new RegExp('.*[0-9].*')
      const result = (Boolean(pattern1.test(control.value)) || Boolean(pattern2.test(control.value)))? null : {"second": false};
      this.secondValidator = result ? false: true;
      return result;
    }

    charNumValidator(control: FormControl): {[key: string]: boolean} | null {
      if (! control.value || control.value== '' ) return {"first": false}
      const result =  control.value.length < 8 ? { "first": false } : null;
      this.firstValidator = result? false: true;
      return result;
    }

    onShowPass():void{
      this.showPassword = !this.showPassword
    }

    isInputFilled():void{
      return this.passForm.controls['password'].value;
    }

}
