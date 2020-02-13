import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { Order } from 'src/app/manager/app.types';
import { FoodsService } from 'src/app/api/foods.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.page.html',
  styleUrls: ['./food-menu.page.scss'],
})
export class FoodMenuPage implements OnInit {
  orders : Order[] = [];
  lang : string = 'ar';
  foods : any[] = [];
  restname : string = '';
  restId : number ;
  pageInfo ={ foodMenu :'' , count:'',price:'',order:'',anotherRest:'',pageTitle:'' };
  constructor(private storage: AppStorageService
    ,private foosdService : FoodsService 
    ,private loader : LoadingService
    ,private _translate : TranslateService
    ,private route: ActivatedRoute
    ,private navCtrl : NavController
    ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.loader.presentLoading();
  
    this.storage.getLang().then(lang=>{
   
      if(lang){
        this.lang = lang.name;
      }
      this._initialiseTranslation();
   

      this.route.queryParams.subscribe(params => {
       let id = params["restId"];
       this.restId = id;
       let restName = params["restName"];
       this.restname = restName;
       let obj = {rest : id, lang : this.lang};
       this.getFoods(obj);
      
      })

    })
   
  }

  changeOrderCount(){
    this.orders.forEach(ord=>{
      let item = this.foods.find(x=>x.id == ord.id);
      if(item !=null){
        item.count = ord.count;
      }
    })
   
  }
  openOrder(){
    this.navCtrl.navigateForward("orders")
  }
  openRest(){ 
    this.navCtrl.back();
  }
  getFoods(obj){
   
    this.foosdService.getFoodsByRestId(obj).then(res=>{
      let response =JSON.parse(res.data);
      console.log(response)
      if(response.Result.rests.length > 0){
        this.foods = response.Result.rests;

        this.storage.getOrders().then(ords=>{
          if(ords){
            this.orders = ords;
           console.log(this.orders) 
           this.changeOrderCount();
          }
         
       })
      }
    }).finally(()=>{
    this.loader.hideLoading();
  }).catch(err=>{
    console.log(err);
    this.loader.presentToast("حدث خطأ أثناء معالجة البيانات")
    this.loader.hideLoading();

  })
  }
  addItem(item){ 
    let itemIndex  = this.orders.findIndex(x=>x.id === item.id);
 
    if(itemIndex == -1){
      item.count += 1 ;
     
      let order ={
        id : item.id,
        title : item.title,
        count : item.count,
        price : item.price,
        restName : this.restname,
        restId : this.restId
      } as Order;

      this.orders.push(order )
      this.storage.AddOrder(this.orders);
      
    }else{
        item.count +=1;
        let order = this.orders.find(x=>x.id == item.id);
        order.count = item.count;
        order.title = item.title;
        order.restName = this.restname;
        this.storage.AddOrder(this.orders);
    }

    console.log(this.orders)
 
  }
  removeItem(item){
  
    
    let itemIndex  = this.orders.findIndex(x=>x.id === item.id);
    if(itemIndex == -1){
      return;
   
    }else{
      let order = this.orders.find(x=>x.id == item.id);
      if(order.count === 1){
        item.count = 0;
        this.orders.splice(itemIndex,1);
        this.storage.AddOrder(this.orders);
      }else{
        item.count -=1;

        order.count = item.count;;
        order.title = item.title;
        order.restName = this.restname;
        this.storage.AddOrder(this.orders);
      }
     
    }
    console.log(this.orders)
  }

  private _initialiseTranslation() : void
 {

    setTimeout(() =>
    {
       this.pageInfo.order   = this._translate.instant("Foods.order");
       this.pageInfo.anotherRest = this._translate.instant("Foods.anotherRest");
       this.pageInfo.count = this._translate.instant("Foods.count");
       this.pageInfo.foodMenu = this._translate.instant("Foods.foodMenu");
       this.pageInfo.price = this._translate.instant("Foods.price");
       this.pageInfo.pageTitle = this._translate.instant("Foods.pageTitle");
    
    }, 250);
 }

}
