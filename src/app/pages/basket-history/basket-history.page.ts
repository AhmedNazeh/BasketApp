import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/api/orders.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { Events, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AppStorageService } from 'src/app/manager/app-storage.service';

@Component({
  selector: 'app-basket-history',
  templateUrl: './basket-history.page.html',
  styleUrls: ['./basket-history.page.scss'],
})
export class BasketHistoryPage implements OnInit {
  orders :any[];
  userId : number;
  constructor(private orderService:OrdersService 
    ,private loader : LoadingService
    ,public events: Events
    , public navCtrl : NavController
    ,private storage : AppStorageService) { }

  ngOnInit() {
    let user =  this.storage.getUserData().then(re=>{
      console.log(re)
   
      this.userId = re.id
    }).then(()=>{
      this.getMyOrders(this.userId)

    })
  }

  getMyOrders(userId){
    this.loader.presentLoading();
    this.orderService.getMyOrders(userId).then(res=>{
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
