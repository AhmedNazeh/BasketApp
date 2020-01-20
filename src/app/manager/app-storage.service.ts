import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage';
import { UserData, UserCity ,UserLang,Order} from './app.types';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private _apiToken = new BehaviorSubject(null);
  private _userData = new BehaviorSubject(null);
  private _userCity = new BehaviorSubject(null);
  private _userLang = new BehaviorSubject(null);
  private _order = new BehaviorSubject(null);
  emitUser = this._userData.asObservable();
  emitUserCity = this._userCity.asObservable();
  emitToken = this._apiToken.asObservable();
  emitOrder = this._order.asObservable();
  private currentUser = null;
  private currentCity = null;
  private currentLang = null;
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


  private async setEmittedLangValues(userLang : UserLang) {
    if (userLang) { 
      this._userLang.next(userLang);
    
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

  removeLang(){
    return new Promise((resolve)=>{
      this.storage.remove('basket:userlang').then((res:any)=>{
        // console.log(res);
        this._userLang.next(null);
       
       resolve(res);
    })
  
    })
  }
  setLang(userLang : UserLang):Promise<UserCity>{
    this._userLang.next(userLang);
    this.currentLang = userLang;
    return this.storage.set('basket:userlang', userLang)
  }
  getLang():Promise<UserLang>{
   
    return this.storage.get('basket:userlang').then((userLang: UserLang) => {
      if (!userLang)
        return;
      this.currentLang = userLang;
      this.setEmittedLangValues(userLang);
      return userLang;
    });
  }

  private async setEmittedOrderValues(order: Order) {
    if (order) { 
     this._order.next(order);
    }
  }
   getOrders ():Promise<Order[]>{
    return this.storage.get('basket:orders').then((order: Order[]) => {
      if (!order)
        return;
      return order;
    });
  }

 async AddOrder(order: Order[]):Promise<Order[]>{
    this._order.next(order); 
    return await this.storage.set('basket:orders', order)
  }

}
