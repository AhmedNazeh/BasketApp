import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';
@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.page.scss'],
  templateUrl: './auth.page.html'
})
export class AuthPage implements OnInit {
  isLoggedIn = false;
  lang : string = 'en';
  langName : string;
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  pageInfo ={login : '',signUp :'',haveAccount :'', Continuewith : '',terms :'',policy:'',and :'',agree : ''};
  constructor(private fb: Facebook,private storage : AppStorageService,
    public menuCtrl: MenuController ,  private _translate : TranslateService) { 
      
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if (res.status === 'connect') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }
ionViewDidEnter(){
  
  this.storage.getLang().then(lang=>{
      if(lang){
        this.lang = lang.name;
      }
      this._initialiseTranslation();
  })
  this.menuCtrl.swipeEnable(false);
}
ionViewWillLeave(){
  this.menuCtrl.swipeEnable(true);
 
}
  ngOnInit() {
  }
  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  private _translateLanguage() : void
  {
    if(this.lang == 'en'){
      this.lang = 'ar';
      this._translate.use('ar');
      let userlang = {name : 'ar'};
      this.storage.setLang(userlang);
    }else{
      this.lang = 'en';
      this._translate.use('en');
      let userlang = {name : 'en'};
      this.storage.setLang(userlang);
    }
     this._initialiseTranslation();
  }

  private _initialiseTranslation() : void
  {
     setTimeout(() =>
     {
        this.langName   = this._translate.instant("lang.name");
        this.pageInfo.Continuewith = this._translate.instant("authPage.Continuewith");
        this.pageInfo.haveAccount = this._translate.instant("authPage.haveAccount");
        this.pageInfo.signUp = this._translate.instant("authPage.SIGNUP");
        this.pageInfo.login = this._translate.instant("authPage.Login");
        this.pageInfo.agree = this._translate.instant("authPage.agree");
        this.pageInfo.terms = this._translate.instant("authPage.termAndCond");
        this.pageInfo.policy = this._translate.instant("authPage.prPolicy");
        this.pageInfo.and = this._translate.instant("authPage.and");
     }, 250);
  }
}
