import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {title: 'splash',url: '/splash',icon: 'home'},
    {title: 'Home',url: '/home',icon: 'home'},
    {title: 'auth',url: '/auth',icon: 'home'},
    {title: 'city',url: '/city',icon: 'home'},
    {title: 'thanks',url: '/thanks',icon: 'home'},
    {title: 'basket off',url: '/basket-off',icon: 'home'},
    {title: 'orders',url: '/orders',icon: 'home'},
    {title: 'place order',url: '/place-order',icon: 'home'},
    {title: 'account information',url: '/account-info',icon: 'home'},
    {title: 'basket history',url: '/basket-history',icon: 'home'},
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
}
