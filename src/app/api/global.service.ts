
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public baseUrl: string = "https://baaskeet.com/api/";
  constructor() { }
}
