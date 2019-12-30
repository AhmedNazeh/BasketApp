import { Component } from '@angular/core';

import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppStorageService } from './manager/app-storage.service';
import { InfoService } from './api/info.service';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  fullName : string = "";
  lang : string = 'ar';
  hello : string = 'hello';
  lblShareApp : string = 'Share App';
  contactInfo ={"email" :"","phone":"","mobile":"","facebook":"","twitter":"","youtube":"","instagram":""};
  public appPages = [
   
    {title: 'Home',url: '/home',icon: 'home'},
    {title: 'Account Information',url: '/account-info',icon: 'contact'},
    {title: 'Basket History',url: '/basket-history',icon: 'basket'},
    {title: 'Common Question',url: '/about-us',icon: 'information-circle'},
    {title: 'Terms Of Use',url: '/informations/1',icon: 'paper'},
    {title: 'Privacy Policy',url: '/informations/2',icon: 'clipboard'},
    {title: 'About Us',url: '/informations/3',icon: 'paw'},
    {title: 'Review Us',url: '/review-us',icon: 'star'},
  ];
  pages :any[] = []

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage : AppStorageService,
    private info : InfoService,
    private AppAvailability: AppAvailability,
    private InAppBrowser: InAppBrowser,
    private Device : Device,
    public router: Router,
    private navCtrl: NavController,
    private socialSharing: SocialSharing,
    private fcm: FCM,
    private _translate : TranslateService,
    public events: Events
   
  ) {
   
    this.initializeApp();
    
    this.backButttonEvent();
    let user =  this.storage.getUserData().then(re=>{
      if(re){
        this.fullName = re.name

      }
      this.fcm.onTokenRefresh().subscribe(token => {
        let model = {user_id:re.id,token:token};
        this.info.saveToken(model);
      });
    })

    events.subscribe('user:lang', (lng, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.lang = lng;
      console.log('languge is', user, 'at', time);
      this.updateMenu();
    });
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      
     
  

      this.fcm.subscribeToTopic('all');

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
        //  this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
         // this.router.navigate([data.landing_page, data.price]);
        }
      });
    }) .then(() =>
    {
       this._initTranslate();
       
    }).then(()=>{
        this.updateMenu();
    });
    
  }
 
  private _initTranslate()
  {
    this.storage.removeLang();
    this.storage.getLang().then(lang=>{
      
      if(lang){
        this.lang = lang.name;
       // Set the default language for translation strings, and the current language.
       this._translate.setDefaultLang(lang.name);   
      }else{
 
        this._translate.setDefaultLang('ar');   
        if (this._translate.getBrowserLang() !== undefined)
        {
          // let lng = this._translate.getBrowserLang();
          // console.log(lng)
          //  this.lang = this._translate.getBrowserLang();
          //   this._translate.use(this._translate.getBrowserLang());
          this._translate.use('ar');
        }
        else
        {
            this._translate.use('ar'); // Set your language here
        }   
      }

     // this.getAllPages();
      this.getContactInfo(this.lang)
    })

    
  }

  updateMenu(){
    if(this.lang === 'ar'){
      this.hello = "مرحبا "
      this.lblShareApp = "Share App "
    }else{
      this.hello = " Hello "
      this.lblShareApp = " مشاركة التطبيق "

    }
  }
   backButttonEvent(){
    this.platform.backButton.subscribe(()=>{
      if (this.router.url === '/home') {
        navigator['app'].exitApp();
      }
      else if(this.router.url === '/basket-history' || this.router.url === '/account-info' || this.router.url === '/about-us'){
        this.navCtrl.navigateRoot(['home'],{skipLocationChange:false,replaceUrl:true})

      }
       else{
          window.history.back();
      }
    })
   }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string) {
    let app: string;
    if (this.Device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.Device.platform === 'Android') {
      app = androidPackageName;
    } else {
      let browser = this.InAppBrowser.create(httpUrl,'_system')
      return;
    }
    console.log(app)
  
   this.AppAvailability.check(app).then( 
      () => { // success callback
        let browser = this.InAppBrowser.create(httpUrl, '_system');
      },
      () => { // error callback 
        let browser = this.InAppBrowser.create(httpUrl , '_system');
      }
    );
  }
  openInstagram(username: string) {
    this.launchExternalApp('instagram://', 'com.instagram.android',this.contactInfo.instagram,this.contactInfo.instagram);
  }
  
  openTwitter(username: string) {
    this.launchExternalApp('twitter://', 'com.twitter.android',this.contactInfo.twitter, this.contactInfo.twitter);
  }

  openFacebook(username: string) {
    this.launchExternalApp('fb://', 'com.facebook.katana', this.contactInfo.facebook,this.contactInfo.facebook);
  }
  CallPhone(){
    console.log('e')
    window.open("tel:"+this.contactInfo.mobile);     
  }
  openEmail(){
    let Link="mailto:"+this.contactInfo.email+"?subject=Hello basket";
    window.open(Link, "_system");
    //window.open('mailto:test@example.com');
  //  window.open("mailto:"+this.contactInfo.email);     
  }

  getContactInfo(lang){

    this.info.getContactDetails(lang).then(res=>{
     let info = JSON.parse(res.data)
    
     
      if(info.Status.Succeed == 1){
        this.contactInfo = info.Result.data
        console.log(this.contactInfo)
      }
    })
  }

  getAllPages(){
    this.info.getAllPage(this.lang).then(res=>{
      let data =JSON.parse(res.data);
      console.log(data);
    })
  }

  shareApp(){
   
   this.socialSharing.share('basket ', 'basket app', null, 'https://baaskeet.com/');
   
  }

  

}
