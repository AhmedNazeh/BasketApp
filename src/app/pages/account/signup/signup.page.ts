import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/api/account.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupform: FormGroup;
  userData = { "username": "", "password": "","phone":"","email" : "","name":""};
  constructor(private accountService : AccountService, private loader : LoadingService,public menuCtrl: MenuController) { }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
     let MOBILEPATTERN = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    this.signupform = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    phone : new FormControl('', [Validators.required, Validators.pattern(MOBILEPATTERN)]),
  });

  }
  ionViewDidEnter(){
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.swipeEnable(true);
   
  }
  register(form){

    console.log(this.userData)
    this.accountService.register(this.userData)
  
  }
}
