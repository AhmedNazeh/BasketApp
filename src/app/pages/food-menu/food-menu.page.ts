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
  foods : Order[] = [];
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
      this.route.params.subscribe(params => {
       let id = params["id"];
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
  openRest(){
    this.navCtrl.back();
  }
  getFoods(obj){
   
    this.foosdService.getFoodsByRestId(obj).then(res=>{
      let response =JSON.parse(res.data);
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
      this.orders.push(item)
      this.storage.AddOrder(this.orders);
      
    }else{
      item.count +=1;
        let order = this.orders.find(x=>x.id == item.id);
        order.count +=1;
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
        order.count -=1;;
        this.storage.AddOrder(this.orders);
      }
     
    }
    console.log(this.orders)
  }
}
