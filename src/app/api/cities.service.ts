import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  url : string = "";
  constructor(private http: HTTP,private global : GlobalService) { 
     this.url = global.baseUrl;
  }

  getCities(){ 
    let cityUrl =  this.url +"getallcities/ar"
      return this.http.get(cityUrl,{},{});
  
    }
  
    testapi(){
     
      const data = {
        username:'123',
        password:'123'
      };
    let url = "https://baaskeet.com/api/login";
    this.http.setDataSerializer('urlencoded')
    return this.http.post(url,data,{})
    }
}
