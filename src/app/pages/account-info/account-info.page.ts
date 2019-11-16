import { UserData } from './../../manager/app.types';
import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage implements OnInit {
user : UserData = {} as UserData
  constructor(private storage : AppStorageService, private navCtrl : NavController) { }

  ngOnInit() {
    this.storage.getUserData().then(res=>{
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
}
