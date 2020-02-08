import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Events } from '@ionic/angular';
import { CitiesSearchComponent } from 'src/app/components/cities-search/cities-search.component';
import { LoadingService } from 'src/app/manager/loading.service';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { OrdersService } from 'src/app/api/orders.service';
import { InfoService } from 'src/app/api/info.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  
cityStatus : CityView  = CityView.isHome
cityName : string = "أختر مدينتك";
cityId : number;
langName : string;
lang : string = 'ar';
pageInfo ={ 
  startSelectCity : '',any :'',items :'',restaurants:'',history:''

  };
  constructor(public modalController: ModalController, 
    private loader : LoadingService,
    private order : OrdersService,
    private navCtrl : NavController ,
     private storage : AppStorageService
     ,  public _translate : TranslateService,public events: Events,
    ) {}


     ngOnInit() {
      
    }
ionViewDidEnter(){
 
  this.storage.getLang().then(lang=>{
    if(lang){
      this.lang = lang.name;
      if(this.lang === 'ar'){
      
        this.cityName ="اختر مدينتك";
      }else{
        this.cityName ="Select You City";
    

      }
    }
    this._initialiseTranslation();
})
  this.storage.getUserData().then(res=>{
    if(!res){
      this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
    }
    
  })
  this.setCityVal();
}


  setCityVal(){
  this.storage.getCity().then(res=>{
    if(res){
      this.cityName = res.name
      this.cityId = res.id;
      this.cityStatus = CityView.IsCityAvalibel;
    }
  })
 }

 _translateLanguage() : void
{
  if(this.lang == 'en'){
    this.lang = 'ar';
    this._translate.use('ar');
   
    let userlang = {name : 'ar'};
    this.storage.setLang(userlang);
  }else{
    this.lang = 'en';
    this._translate.use('en');
  
    let userlang = {name : 'en'};
    this.storage.setLang(userlang);
  }
  this.events.publish('user:lang', this.lang, Date.now());
   this._initialiseTranslation();
  // this.setCityVal();

}

 openbasket(){
   this.loader.presentLoading();
   this.order.canMakeOrder().then(res=>{
    this.loader.hideLoading();
    let isAvalibel = JSON.parse(res.data);
    if(isAvalibel === true){
      this.navCtrl.navigateForward("orders")
    }else{
      this.loader.presentToast(" نعتذر الطلبات متوقفة حاليا.. مواعيد العمل من 8 صباحاً إلى 2 صباحاً ")
    }
   
   }).catch(()=>{
     this.loader.hideLoading();
     this.loader.presentToast("حدث خطأ اثناء معالحة الطلب")
   })
  
 }

 openhistory(){
  this.navCtrl.navigateForward("basket-history")
}

openRestaurant(){
  this.loader.presentLoading();
   this.order.canMakeOrder().then(res=>{
    this.loader.hideLoading();
    let isAvalibel = JSON.parse(res.data);
    if(isAvalibel === true){
      this.navCtrl.navigateForward("restaurant")
    }else{
      this.loader.presentToast("نعتذر خدمة الطلبات متوقفه حاليا")
    }
   
   }).catch(()=>{
     this.loader.hideLoading();
     this.loader.presentToast("حدث خطأ اثناء معالحة الطلب")
   })
  
} 
  async presentModal() {
    const modal = await this.modalController.create({ 
    component: CitiesSearchComponent,
    
   // componentProps: { value: 123 }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data)
    console.log(data.data.selected)
    if(data.data.selected !=null){
      this.cityStatus = CityView.IsCityAvalibel;
      this.cityName = data.data.selected.nane
      this.cityId = data.data.selected.id;
      var usercity = {name:this.cityName,id:this.cityId};
      this.storage.setCity(usercity);
    }
    
  
  }

  openHistory(){
    this.navCtrl.navigateRoot(['basket-history'])
  }

  private _initialiseTranslation() : void
 {

    setTimeout(() =>
    {
       this.langName   = this._translate.instant("lang.name");
       this.pageInfo.startSelectCity   = this._translate.instant("homePage.startSelectCity");
       this.pageInfo.any = this._translate.instant("homePage.any");
       this.pageInfo.items = this._translate.instant("homePage.items");
       this.pageInfo.history = this._translate.instant("homePage.history");
       this.pageInfo.restaurants = this._translate.instant("homePage.restaurants");
       //this.cityName = this._translate.instant('citiesPage.cityTitle');
    }, 250);
 }
}


export enum CityView {
  isHome = 1,
  IsCityAvalibel = 2,
  IsCityUnavalibel = 3
  
}