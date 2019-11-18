import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { LoadingService } from '../manager/loading.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private global : GlobalService,private loader : LoadingService, public navCtrl : NavController) { }

  getfaqs(){
    return this.global.get('faqs/en',{},{});
  }

  getContactDetails(){
    return this.global.get('contactdetails/en',{},{});
  }

  getSinglePage(model){
    return this.global.post('singlepage',model,{});
  }
  getAllPage(){
    return this.global.get('allpages/en',{},{});
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
}
