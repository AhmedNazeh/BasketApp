import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/api/account.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupform: FormGroup;
  userData = { "username": "", "password": "","phone":"","email" : "","name":""};
  pageInfo ={
    signupTitle : '',Username :'',usernameReq :'', usernameMin : '',usernameMax :'',
    password:'',passwordReq :'',passwordMin : '',  passwordMax:'',
    mobile : '',mobileReq : '', mobileValid : '',email : '',emailReq : '', emailValid : '',   name:'',nameReq :'',
    nameMin : '',nameMax : '', register : '',haveAccount : '', login : ''
  };
  constructor(private accountService : AccountService, private loader : LoadingService,
           public menuCtrl: MenuController,  private _translate : TranslateService) { }

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
    this._initialiseTranslation();
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.swipeEnable(true);
   
  }
  register(){

    console.log(this.userData)
    this.accountService.register(this.userData)
  
  }

  private _initialiseTranslation() : void
  {
   
     setTimeout(() =>
     {
        this.pageInfo.signupTitle   = this._translate.instant("signupPage.signupTitle");
        this.pageInfo.Username = this._translate.instant("signupPage.Username");
        this.pageInfo.usernameReq = this._translate.instant("signupPage.usernameReq");
        this.pageInfo.usernameMin = this._translate.instant("signupPage.usernameMin");
        this.pageInfo.password = this._translate.instant("signupPage.password");
        this.pageInfo.passwordReq = this._translate.instant("signupPage.passwordReq");
        this.pageInfo.passwordMin = this._translate.instant("signupPage.passwordMin");
        this.pageInfo.passwordMax = this._translate.instant("signupPage.passwordMax");
        this.pageInfo.mobile = this._translate.instant("signupPage.mobile");
        this.pageInfo.mobileReq = this._translate.instant("signupPage.mobileReq");
        this.pageInfo.mobileValid = this._translate.instant("signupPage.mobileValid");
        this.pageInfo.email = this._translate.instant("signupPage.email");
        this.pageInfo.emailReq = this._translate.instant("signupPage.emailReq");
        this.pageInfo.emailValid = this._translate.instant("signupPage.emailValid");
        this.pageInfo.name = this._translate.instant("signupPage.name");
        this.pageInfo.nameReq = this._translate.instant("signupPage.nameReq");
        this.pageInfo.nameMin = this._translate.instant("signupPage.nameMin");
        this.pageInfo.nameMax = this._translate.instant("signupPage.nameMax");
        this.pageInfo.register = this._translate.instant("signupPage.register");
        this.pageInfo.haveAccount = this._translate.instant("signupPage.haveAccount");
        this.pageInfo.login = this._translate.instant("signupPage.login");
     }, 250);
  }
}
