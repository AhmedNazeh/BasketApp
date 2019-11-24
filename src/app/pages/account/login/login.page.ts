import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/api/account.service';
import { Observable } from 'rxjs';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupform: FormGroup;
  userData = { "username": "", "password": ""};
  pageInfo ={
              loginTitle : '',Username :'',usernameReq :'', usernameMin : '',usernameMax :'',
              password:'',passwordReq :'',passwordMin : '',  passwordMax:'',forgetPassword :'',
              donnotHaveAcc : '',Register : '', Login : ''
            };
  
  link : string = '#'
  constructor(private accountService: AccountService,
    public menuCtrl: MenuController ,  private _translate : TranslateService) { 
    
  
   
  }

  ionViewDidEnter(){
    this._initialiseTranslation();
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.swipeEnable(true);
   
  }

  ngOnInit() {
   // let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
     // name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
     // email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
    this.forgetPasswordLink();
  }
  ionViewDidLoad(){
  
  }

  login(){
    console.log(this.userData)
    this.accountService.login(this.userData)
  }

  forgetPasswordLink(){
    this.accountService.forgetPassword().then(re=>{
      let response = JSON.parse(re.data);
      if(response.Status.Succeed == 1){
       this.link = response.Result.link
      }
    })
  }

  private _initialiseTranslation() : void
  {
 
     setTimeout(() =>
     {
        this.pageInfo.loginTitle   = this._translate.instant("loginPage.loginTitle");
        this.pageInfo.Username = this._translate.instant("loginPage.Username");
        this.pageInfo.usernameReq = this._translate.instant("loginPage.usernameReq");
        this.pageInfo.usernameMin = this._translate.instant("loginPage.usernameMin");
        this.pageInfo.password = this._translate.instant("loginPage.password");
        this.pageInfo.passwordReq = this._translate.instant("loginPage.passwordReq");
        this.pageInfo.passwordMin = this._translate.instant("loginPage.passwordMin");
        this.pageInfo.passwordMax = this._translate.instant("loginPage.passwordMax");
        this.pageInfo.forgetPassword = this._translate.instant("loginPage.forgetPassword");
        this.pageInfo.donnotHaveAcc = this._translate.instant("loginPage.donnotHaveAcc");
        this.pageInfo.Register = this._translate.instant("loginPage.Register");
        this.pageInfo.Login = this._translate.instant("loginPage.Login");
     }, 250);
  }

}
