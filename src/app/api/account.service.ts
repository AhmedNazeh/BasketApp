import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { UserData } from '../manager/app.types';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url : string = "";
  constructor(private global : GlobalService) { 
     this.url = global.baseUrl;
  }

  register(model) {
   
    return this.global.post("register",model,{});
  }

 login(model){
    this.global.post("login",model,{});
 }

// mapUserInfo () : UserData{

// }
 

}
