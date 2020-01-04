import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserData } from 'src/app/manager/app.types';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { AccountService } from 'src/app/api/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.page.html',
  styleUrls: ['./update-info.page.scss'],
})
export class UpdateInfoPage implements OnInit {
  updateform: FormGroup;
  user : UserData = {} as UserData
  pageInfo ={
    updateTitle : '',
    password:'',passwordReq :'',passwordMin : '',  passwordMax:'',
    mobile : '',mobileReq : '', mobileValid : '',email : '',emailReq : '', emailValid : '',   name:'',nameReq :'',
    nameMin : '',nameMax : '', register : '',updateInfo : '', update : ''
  };
  lang : string = 'ar';
  constructor(private storage : AppStorageService,
    private accountService : AccountService,  private _translate : TranslateService) { }

    ionViewDidEnter(){
      this.storage.getLang().then(lang=>{
        if(lang){
          this.lang = lang.name;
          this._translate.use(this.lang);
        }
        this._initialiseTranslation();
    })
    }
  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let MOBILEPATTERN = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
   this.updateform = new FormGroup({
   
   name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
   email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
   phone : new FormControl('', [Validators.required, Validators.pattern(MOBILEPATTERN)]),
  });
    this.storage.getUserData().then(res=>{
      this.user = res;
 
    }).then(()=>{
      this.updateform.get('name').setValue(this.user.name);
      this.updateform.get('email').setValue(this.user.email);
      this.updateform.get('phone').setValue(this.user.phone);

    })
//
  }
  updateinfo(){
    let model = this.updateform.value;
    model.user_id = this.user.id;
    console.log(model)
    this.accountService.UpdateInfo(model)
  }

  private _initialiseTranslation() : void
  {
   
     setTimeout(() =>
     {
        this.pageInfo.updateTitle   = this._translate.instant("updateInfoPage.updateTitle");
        this.pageInfo.updateInfo = this._translate.instant("updateInfoPage.updateInfo");
        this.pageInfo.update = this._translate.instant("updateInfoPage.update");
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
       
     }, 250);
  }
}
