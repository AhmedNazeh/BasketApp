import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url : string = "";
  constructor(private http: HTTP,private global : GlobalService) { 
     this.url = global.baseUrl;
  }

  register(model) {
   
    var urlReg = this.url +"api/register/ar";
    return this.http.post(urlReg,model, model);
  }

 

}
