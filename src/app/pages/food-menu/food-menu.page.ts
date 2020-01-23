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
  foods : [] = [];
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
  openRest(){
    this.navCtrl.back();
  }
  getFoods(obj){
    this.loader.presentLoading();
    this.foosdService.getFoodsByRestId(obj).then(res=>{
      let response =JSON.parse(res.data);
      if(response.Result.rests.length > 0){
        this.foods = response.Result.rests;
 
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
