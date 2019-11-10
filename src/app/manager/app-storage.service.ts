import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage';
import { UserData, UserCity } from './app.types';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private _apiToken = new BehaviorSubject(null);
  private _userData = new BehaviorSubject(null);
  private _userCity = new BehaviorSubject(null);
  emitUser = this._userData.asObservable();
  emitUserCity = this._userCity.asObservable();
  emitToken = this._apiToken.asObservable();
  private currentUser = null;
  private currentCity = null;
  constructor(public storage: Storage) { }

  getUserData(): Promise<UserData> {
    return this.storage.get('basket:userdata').then((userData: UserData) => {
      if (!userData)
        return;
      this.currentUser = userData;
      this.setEmittedValues(userData);
      return userData;
    });
  }

  setCity(userCity : UserCity):Promise<UserCity>{
    this._userCity.next(userCity);
    this.currentCity = userCity;
    return this.storage.set('basket:userCity', userCity)
  }
  getCity():Promise<UserCity>{
   
    return this.storage.get('basket:userCity').then((userCity: UserCity) => {
      if (!userCity)
        return;
      this.currentCity = userCity;
      this.setEmittedCityValues(userCity);
      return userCity;
    });
  }
  getActiveUser(){
    return this.currentUser;
  }

  getActiveCity(){
    return this.currentCity;
  }

  private async setEmittedValues(userData: UserData) {
    if (userData) { //fixed error 'token of null', check userData storage
      this._userData.next(userData);
      this._apiToken.next("");
    }

  }

  private async setEmittedCityValues(userCity : UserCity) {
    if (userCity) { //fixed error 'token of null', check userData storage
      this._userCity.next(userCity);
    
    }

  }


  
  saveUserData(userData: UserData): Promise<UserData> {
    this._userData.next(userData);
    this.currentUser = userData;
    return this.storage.set('basket:userdata', userData)
  }

  removeUserData()
  {
    
    return new Promise((resolve)=>{
    this.storage.remove('basket:userdata').then((res:any)=>{
      // console.log(res);
      this._userData.next(null);
      this._apiToken.next(null);
      
     // return 'remove';
     resolve(res);
    }).then(()=>{
      this.storage.remove('basket:userCity').then((resp:any)=>{
        this._userCity.next(null);
        resolve(resp)
      })
    })
  });
}



  getApiToken(): Promise<string> {
    return this.emitToken.toPromise();
  }

  setApiToken(token: string): void {
    this._apiToken.next(token);

  }

}
