import { UserData } from './../../manager/app.types';
import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage implements OnInit {
user : UserData = {} as UserData
pageInfo ={
  accountInfoTitle : '',name :'',userName :'', email : '',mobile :'',
  logOut:'',updateProfile :'',changePassword :''
  };
  constructor(private storage : AppStorageService, private navCtrl : NavController,  private _translate : TranslateService) { }

  ionViewDidEnter(){
   this._initialiseTranslation();
  }
  ngOnInit() {
    this.storage.getUserData().then(res=>{
      if(!res){
        this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
      }
      this.user = res;
 
    })
  }

  logOut(){
    this.storage.removeUserData().then(re=>{
     
      this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
    })
   }

   updateInfo(){
     this.navCtrl.navigateForward("update-info")
   }

   changePassword(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          userId: this.user.id
      }
    };
    this.navCtrl.navigateRoot(['update-password'],navigationExtras)
  
   }

   private _initialiseTranslation() : void
  {
   
     setTimeout(() =>
     {
        this.pageInfo.accountInfoTitle   = this._translate.instant("accountInfoPage.accountInfoTitle");
        this.pageInfo.userName = this._translate.instant("accountInfoPage.userName");
        this.pageInfo.name = this._translate.instant("accountInfoPage.name");
        this.pageInfo.email = this._translate.instant("accountInfoPage.email");
        this.pageInfo.mobile = this._translate.instant("accountInfoPage.mobile");
        this.pageInfo.logOut = this._translate.instant("accountInfoPage.logOut");
        this.pageInfo.updateProfile = this._translate.instant("accountInfoPage.updateProfile");
        this.pageInfo.changePassword = this._translate.instant("accountInfoPage.changePassword");
        
      
     }, 250);
  }
}
