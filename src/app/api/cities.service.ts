import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  url : string = "";
  constructor(private global : GlobalService) { 
     this.url = global.baseUrl;
  }

  getCities(lang){ 

      return this.global.get("getallcities/"+lang,{},{});
  
    }
  
    testapi(){
     
      const data = {
        username:'123',
        password:'123'
      };
    let url = "https://baaskeet.com/api/login"; 
    return this.global.post(url,data,{})
    }
}
