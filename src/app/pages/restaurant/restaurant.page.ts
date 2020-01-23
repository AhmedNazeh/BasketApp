import { FoodsService } from './../../api/foods.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/manager/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  restaurant : [] = [];
  lang : string = 'ar';

  constructor(private navCtrl : NavController
    ,private foosdService : FoodsService 
    ,private loader : LoadingService
    ,private _translate : TranslateService
    ,private storage : AppStorageService) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.getLang().then(lang=>{
      if(lang){
        this.lang = lang.name;
      }
      this.getAll(this.lang)
    })
  }
 openMenu(id){
  this.navCtrl.navigateForward("food-menu/"+id)
  
 }

 getAll(lang){
  this.loader.presentLoading();
    this.foosdService.getAllRest(lang).then(res=>{
      let response =JSON.parse(res.data);
      if(response.Result.rests.length > 0){
        this.restaurant = response.Result.rests;
 
      }
    }).finally(()=>{
    this.loader.hideLoading();
  }).catch(err=>{
    console.log(err);
    this.loader.presentToast("حدث خطأ أثناء معالجة البيانات")
    this.loader.hideLoading();

  })
 }

}
