import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage';
import { UserData } from './app.types';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private _apiToken = new BehaviorSubject(null);
  private _userData = new BehaviorSubject(null);
  emitUser = this._userData.asObservable();
  emitToken = this._apiToken.asObservable();
  private currentUser = null;

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
  
  getActiveUser(){
    return this.currentUser;
  }

  private async setEmittedValues(userData: UserData) {
    if (userData) { //fixed error 'token of null', check userData storage
      this._userData.next(userData);
      this._apiToken.next("");
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
