import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/api/orders.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { Events, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-basket-history',
  templateUrl: './basket-history.page.html',
  styleUrls: ['./basket-history.page.scss'],
})
export class BasketHistoryPage implements OnInit {
  orders :any[];
  constructor(private orderService:OrdersService 
    ,private loader : LoadingService
    ,public events: Events
    , public navCtrl : NavController) { }

  ngOnInit() {
    this.getMyOrders()
  }

  getMyOrders(){
    this.loader.presentLoading();
    this.orderService.getMyOrders().then(res=>{
      console.log(res)
      let data = JSON.parse(res.data)
      this.orders = data.Result.orders ;
      console.log(this.orders)
    }).finally(()=>{
      this.loader.hideLoading();
    })
  }

  
  reOrder(item){
    this.loader.presentLoading();
    this.orderService.reOrder(item.id).then(res=>{
      let data = JSON.parse(res.data)
      let navigationExtras: NavigationExtras = {
        queryParams: {
            orderId: data.Result.order_id,
           
        }
    };
    
      this.navCtrl.navigateRoot(['thanks'],navigationExtras)
    }).finally(()=>{
      this.loader.hideLoading();
    })
 
 }
}
