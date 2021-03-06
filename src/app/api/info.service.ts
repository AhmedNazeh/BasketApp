import { Injectable, Inject } from '@angular/core';
import { GlobalService } from './global.service';
import { LoadingService } from '../manager/loading.service';
import { NavController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private global : GlobalService,
    private loader : LoadingService, public navCtrl : NavController, 
    ) { }

  getfaqs(lang){
    return this.global.get('faqs/'+lang,{},{});
  }

  getContactDetails(lang){
    return this.global.get('contactdetails/' + lang,{},{});
  }
  // changeDir(dir){
  //   this.document.documentElement.dir = dir;
  // }
  getSinglePage(model){
    return this.global.post('singlepage',model,{});
  }
  getAllPage(lng){
    
    console.log(lng)
    return this.global.get('allpages/'+lng,{},{});
  }

  sendReview(model){
    this.loader.presentLoading();
    this.global.post("review",model,{}).then(res=>{
     
      let info = JSON.parse(res.data)
      if(info.Status.Succeed == 0){
         this.loader.presentToast( info.Status.message);
         return false;
      }else{
        this.loader.presentToast( info.Status.message);
        this.navCtrl.navigateRoot(['home'],{skipLocationChange:false,replaceUrl:true})

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

  saveToken(model){
    this.global.post("savetoken",model,{});
  }
}
