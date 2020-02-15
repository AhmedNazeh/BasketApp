import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { MenuController, Events, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { AccountService } from 'src/app/api/account.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { InfoService } from 'src/app/api/info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.page.scss'],
  templateUrl: './auth.page.html'
})
export class AuthPage implements OnInit {
  signupform: FormGroup;
  showMobile : boolean = false;
  mobile : string = '';
  isLoggedIn = false;
  lang: string = 'ar';
  langName: string;
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  userData = { "username": "", "password": "Basket@50" };
  userInfo = { username: '', name: '', email: '', phone: '', password: "Basket@50" };
  pageInfo = { login: '', signUp: '', haveAccount: '', Continuewith: '', terms: '', policy: '', and: '', agree: ''
,mobile : '',mobileReq : '', mobileValid : '' ,register : ''};
  constructor(private fb: Facebook,
    private accountService: AccountService,
    private fcm: FCM,
    private navCtrl: NavController,
    private info: InfoService,
    private loader: LoadingService,
    private storage: AppStorageService,
    public menuCtrl: MenuController, public _translate: TranslateService, public events: Events) {

    // fb.getLoginStatus()
    // .then(res => {
    //   console.log(res.status);
    //   if (res.status === 'connect') {
    //     this.isLoggedIn = true;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // })
    // .catch(e => console.log(e));
  }
  ionViewDidEnter() {
   
    this.storage.getLang().then(lang => {
      if (lang) {
        this.lang = lang.name;
      }
      this._initialiseTranslation();
    })
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);

  }
  ngOnInit() {
    let MOBILEPATTERN = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    this.signupform = new FormGroup({
      phone : new FormControl('', [Validators.required, Validators.pattern(MOBILEPATTERN)]),
    });

  }

  async fbLogin22() {

    this.fb.login(["public_profile", "email"])
      .then(response => {
        let userId = response.authResponse.userID;

        //Getting name and gender properties
        this.fb.api("/me?fields=name,email", ["public_profile", "email"])
          .then(user => {

            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            console.log(user)
          })
      }, error => {
        console.log(error);

      });
  }


  async fbLogin() {
    try {
      // Log in to Facebook and request user data
      let facebookResponse = await this.fb.login(['public_profile', 'email']);
      let facebookAuthData = {
        id: facebookResponse.authResponse.userID,
        access_token: facebookResponse.authResponse.accessToken,
      };
      console.log(facebookAuthData)

      this.userData.username = facebookAuthData.id;
      this.loader.presentLoading();
      this.accountService.loginByFacebook(this.userData).then(async res => {
        this.loader.hideLoading();
        let info = JSON.parse(res.data)
        if (info.Status.Succeed == 0) {
          let userData = await this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', []);
          this.userInfo.username = facebookAuthData.id;
          this.userInfo.name = userData.name;
          this.userInfo.email = userData.email;
          this.showMobile = true;
          //this.accountService.register(this.userInfo)
        } else {
          this.storage.saveUserData(info.Result.user).then(r => {
            this.fcm.getToken().then(token => {
              console.log(token);
              let model = { user_id: r.id, token: token };
              this.info.saveToken(model);
            });
            this.navCtrl.navigateRoot(['home'], { skipLocationChange: false, replaceUrl: true })

          })
        }
      }).catch(err=>{
        this.loader.hideLoading();
        this.loader.presentToast("حدث خطأ أثناء عملية التسجيل ")
        console.log('Error logging in', err);
      })

      } catch (err) {
        this.loader.presentToast("حدث خطأ أثناء عملية التسجيل ")
        console.log('Error logging in', err);

      }
    }



  fbLogin3() {
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

    _translateLanguage() : void
      {
        if(this.lang == 'en'){
      this.lang = 'ar';
      this._translate.use('ar');
      let userlang = { name: 'ar' };
      this.storage.setLang(userlang);
    }else {
      this.lang = 'en';
      this._translate.use('en');
      let userlang = { name: 'en' };
      this.storage.setLang(userlang);
    }
    this.events.publish('user:lang', this.lang, Date.now());
    this._initialiseTranslation();
  }

  register(){
    this.userInfo.phone = this.mobile;
    console.log(this.userInfo)
    this.accountService.register(this.userInfo)
  }

  private _initialiseTranslation(): void {
    setTimeout(() => {
      this.langName = this._translate.instant("lang.name");
      this.pageInfo.Continuewith = this._translate.instant("authPage.Continuewith");
      this.pageInfo.haveAccount = this._translate.instant("authPage.haveAccount");
      this.pageInfo.signUp = this._translate.instant("authPage.SIGNUP");
      this.pageInfo.login = this._translate.instant("authPage.Login");
      this.pageInfo.agree = this._translate.instant("authPage.agree");
      this.pageInfo.terms = this._translate.instant("authPage.termAndCond");
      this.pageInfo.policy = this._translate.instant("authPage.prPolicy");
      this.pageInfo.and = this._translate.instant("authPage.and");
      this.pageInfo.mobile = this._translate.instant("signupPage.mobile");
      this.pageInfo.mobileReq = this._translate.instant("signupPage.mobileReq");
      this.pageInfo.mobileValid = this._translate.instant("signupPage.mobileValid");
      this.pageInfo.register = this._translate.instant("signupPage.register");
    }, 250);
  }
}
