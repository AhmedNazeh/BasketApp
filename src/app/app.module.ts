import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    AppAvailability,
    InAppBrowser,
    Device,SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
