import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { UserData } from '../manager/app.types';
import { LoadingService } from '../manager/loading.service';
import { AppStorageService } from '../manager/app-storage.service';
import { NavController } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { InfoService } from './info.service';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url : string = "";
  constructor(private global : GlobalService ,
    private loader : LoadingService,
    private storage : AppStorageService,
    private navCtrl : NavController,
    private fcm: FCM,
    private info : InfoService) { 
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
        this.fcm.getToken().then(token => {
          console.log(token);
          let model = {user_id:r.id,token:token};
          this.info.saveToken(model);
        });
        this.navCtrl.navigateRoot(['home'],{skipLocationChange:false,replaceUrl:true})
      })
      }
    }).catch(err=>{
      console.log(err)
      this.loader.presentToast( "something went wrong");
      this.loader.hideLoading();
      return false;
    }).finally(()=>{
      this.loader.hideLoading();
      
    });
  }
async loginByFacebook(model){
 return  this.global.post("login",model,{});
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
        this.fcm.getToken().then(token => {
          console.log(token);
          let model = {user_id:r.id,token:token};
          this.info.saveToken(model);
        });
        this.navCtrl.navigateRoot(['home'],{skipLocationChange:false,replaceUrl:true})
      })
      }
    }).catch(err=>{
      console.log(err)
      this.loader.presentToast( "something went wrong");
      this.loader.hideLoading();
      return false;
    }).finally(()=>{
      this.loader.hideLoading();
      
    });
 }

// mapUserInfo () : UserData{

// }
 UpdateInfo(model){
  this.loader.presentLoading();
  return this.global.post("updateprofile",model,{}).then(res=>{
    let info = JSON.parse(res.data)
   console.log(info)
    if(info.Status.Succeed == 0){
       this.loader.presentToast( info.Status.message);
       return false;
    }else{
    this.storage.saveUserData(info.Result.user).then(r=>{
      this.loader.presentToast( "Account Info has been changed");
      this.navCtrl.navigateForward("home")
    })
    }
  }).catch(err=>{
    console.log(err)
    this.loader.presentToast( "something went wrong");
    this.loader.hideLoading();
    return false;
  }).finally(()=>{
    this.loader.hideLoading();
    
  });
 }
 forgetPassword(){
   return this.global.get('forgetpassword/ar',{},{});
 }

 changePassword(model){
  this.loader.presentLoading();
  this.global.post("changePassword",model,{}).then(res=>{
   
    let info = JSON.parse(res.data)
    if(info.Status.Succeed == 0){
       this.loader.presentToast( info.Status.message);
       return false;
    }else{
      this.loader.presentToast( "password has been changed");
      this.navCtrl.navigateForward("account-info")
    }
  }).catch(err=>{
    console.log(err)
    this.loader.presentToast( "something went wrong");
    this.loader.hideLoading();
    return false;
  }).finally(()=>{
    this.loader.hideLoading();
    
  });
 }

}
