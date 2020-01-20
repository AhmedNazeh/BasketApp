import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { Order } from 'src/app/manager/app.types';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.page.html',
  styleUrls: ['./food-menu.page.scss'],
})
export class FoodMenuPage implements OnInit {
  orders : Order[] = [];
  constructor(private storage: AppStorageService) { }

  ngOnInit() {
  }

  addItem(item){   
  
    this.orders.push(item)
    this.storage.AddOrder(this.orders);
  }
  removeItem(id){
    let itemIndex  = this.orders.findIndex(x=>x.id === id);
    if(itemIndex != -1){
      this.orders.splice(itemIndex,1);
      this.storage.AddOrder(this.orders);
    }
  }
}
