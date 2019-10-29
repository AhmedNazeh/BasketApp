import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url : string = "";
  constructor(private http: HttpClient,private global : GlobalService) { 
     this.url = global.baseUrl;
  }

  register(model) : Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");

    var urlReg = this.url +"api/register/ar";
    return this.http.post(urlReg,model, {headers: headers});
  }

  getCitiesInfo() : Observable<any>{
  let cityUrl =  this.url +"getallcities/ar"
    return this.http.get(cityUrl);

  }

  testapi(): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append("Access-Control-Allow-Headers","*").append('Access-Control-Allow-Credentials', "true").append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    const formData = new FormData();
    formData.append('user_id', "20");
  let url = "https://baaskeet.com/api/api/ordermine";
  return this.http.post(url,formData, {headers: headers})
  }
}
