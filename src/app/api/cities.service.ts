import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  url : string = "";
  constructor(private http: HttpClient,private global : GlobalService) { 
     this.url = global.baseUrl;
  }

  getCities(): Observable<any>{
    let cityUrl =  this.url +"getallcities/ar"
      return this.http.get(cityUrl);
  
    }
  
}
