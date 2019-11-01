
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public baseUrl: string = "https://baaskeet.com/api/";
  constructor(private http: HTTP,) { }

  post(url,data,headers){
    this.http.setDataSerializer('urlencoded')
    return this.http.post(this.baseUrl+url,data,headers)
  }

  get(url,data,headers){
    return this.http.get(this.baseUrl+url,data,headers)
  }
  

}


