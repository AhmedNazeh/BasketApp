import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { UserData } from '../manager/app.types';
import { LoadingService } from '../manager/loading.service';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url : string = "";
  constructor(private global : GlobalService ,private loader : LoadingService) { 
     this.url = global.baseUrl;
  }

  register(model) {
   
    return this.global.post("register",model,{});
  }

 login(model){
    this.global.post("login",model,{}).then(res=>{
      let info = res.data;
      if(info.Status.Succeed == 0){
         this.loader.presentToast( info.Status.message);
         return false;
      }else{
      
      }
    }).catch(err=>{
      this.loader.presentToast( "something went wrong");
      return false;
    });
 }

// mapUserInfo () : UserData{

// }
 

}
