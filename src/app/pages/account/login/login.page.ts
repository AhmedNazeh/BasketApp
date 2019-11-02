import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/api/account.service';
import { Observable } from 'rxjs';
import { AppStorageService } from 'src/app/manager/app-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupform: FormGroup;
  userData = { "username": "", "password": ""};

  constructor(private accountService: AccountService , private storage : AppStorageService) { 
    
  
  
  }

  ngOnInit() {
   // let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
     // name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
     // email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }
  ionViewDidLoad(){
   
  }

  login(){
    console.log(this.userData)
    this.accountService.login(this.userData)
  }

}
