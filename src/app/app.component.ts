import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppStorageService } from './manager/app-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  fullName : string = "";
  public appPages = [
   
    {title: 'Home',url: '/home',icon: 'home'},
    {title: 'account information',url: '/account-info',icon: 'contact'},
    {title: 'basket history',url: '/basket-history',icon: 'basket'},
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage : AppStorageService,
    private navCtrl : NavController
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let user =  this.storage.getUserData().then(re=>{
        if(re){
          this.fullName = re.name

        }
      
      })
    });
  }

  logOut(){
   this.storage.removeUserData().then(re=>{
     this.navCtrl.navigateForward("login")
   })
  }

  CallPhone(){
    window.open("tel:01013084111");     
  }
}
