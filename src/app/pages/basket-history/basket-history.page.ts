import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/api/orders.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { Events, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-basket-history',
  templateUrl: './basket-history.page.html',
  styleUrls: ['./basket-history.page.scss'],
})
export class BasketHistoryPage implements OnInit {
  orders : Array<any> =  [];
  userId : number;
  pageInfo ={
    basketHistoryTitle : '',reorder :'',basketEmpty:''
    };
  constructor(private orderService:OrdersService 
    ,private loader : LoadingService
    ,public events: Events
    , public navCtrl : NavController
    ,private storage : AppStorageService
    ,  private _translate : TranslateService) { }

    ionViewDidEnter(){
      this._initialiseTranslation();
    }

  ngOnInit() {
    let user =  this.storage.getUserData().then(re=>{
      console.log(re)
      if(!re){
        this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
      } 
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
      if(data.Result.orders.length > 0){
        this.orders.push(data.Result.orders ) ;

      }
      console.log(this.orders)

    }).finally(()=>{
      this.loader.hideLoading();
    }).catch(err=>{
      console.log(err)
      this.loader.presentToast("something went wrong !")
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

   
 private _initialiseTranslation() : void
 {
 
    setTimeout(() =>
    {
       this.pageInfo.basketHistoryTitle   = this._translate.instant("basketHistoryPage.basketHistoryTitle");
       this.pageInfo.reorder = this._translate.instant("basketHistoryPage.reorder");
       this.pageInfo.basketEmpty = this._translate.instant("basketHistoryPage.basketEmpty");
       
      
    }, 250);
 }
}
