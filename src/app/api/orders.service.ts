import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private global : GlobalService) { 
    
  }
  canMakeOrder(){
    return this.global.get('isavailable/',{},{});
  }
  getMyOrders(userId){
    return this.global.post("ordermine",{user_id:userId,lang : 'ar'},{});
  }

  reOrder(orderId){
    return this.global.post("reorder",{lang : 'ar',order_id:orderId},{})
  }

  order(item){
    return this.global.post("orderstore",item,{});
  }
}
