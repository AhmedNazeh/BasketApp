import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  register(model){
   
  }

  getCitiesInfo() : Observable<any>{
  let cityUrl =  this.url +"getallcities/ar"
    return this.http.get(cityUrl);

  }
}
