import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { UserData } from '../manager/app.types';
import { LoadingService } from '../manager/loading.service';
import { AppStorageService } from '../manager/app-storage.service';
import { NavController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url : string = "";
  constructor(private global : GlobalService ,private loader : LoadingService,private storage : AppStorageService,private navCtrl : NavController) { 
     this.url = global.baseUrl;
  }

  register(model) {
    this.loader.presentLoading();
    return this.global.post("register",model,{}).then(res=>{
      let info = JSON.parse(res.data)
     
      if(info.Status.Succeed == 0){
         this.loader.presentToast( info.Status.message);
         return false;
      }else{
      this.storage.saveUserData(info.Result.user).then(r=>{
        this.navCtrl.navigateForward("home")
      })
      }
    }).catch(err=>{
      this.loader.presentToast( "something went wrong");
      return false;
    }).finally(()=>{
      this.loader.hideLoading();
      
    });
  }

 login(model){
   this.loader.presentLoading();
    this.global.post("login",model,{}).then(res=>{
     
      let info = JSON.parse(res.data)
      if(info.Status.Succeed == 0){
         this.loader.presentToast( info.Status.message);
         return false;
      }else{
      this.storage.saveUserData(info.Result.user).then(r=>{
        this.navCtrl.navigateForward("home")
      })
      }
    }).catch(err=>{
      this.loader.presentToast(err)
     // this.loader.presentToast( "something went wrong");
      return false;
    }).finally(()=>{
      this.loader.hideLoading();
      
    });
 }

// mapUserInfo () : UserData{

// }
 

}
