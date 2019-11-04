import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
userId : number = 20;
  constructor(private global : GlobalService) { 
    
  }

  getMyOrders(){
    return this.global.post("ordermine",{user_id:this.userId,lang : 'ar'},{});
  }

  reOrder(orderId){
    return this.global.post("reorder",{lang : 'ar',order_id:orderId},{})
  }

  order(item){
    return this.global.post("orderstore",item,{});
  }
}
