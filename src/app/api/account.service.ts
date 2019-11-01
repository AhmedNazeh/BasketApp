import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url : string = "";
  constructor(private global : GlobalService) { 
     this.url = global.baseUrl;
  }

  register(model) {
   
    return this.global.post("api/register/ar",model,{});
  }



 

}
