import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Events } from '@ionic/angular';
import { CitiesSearchComponent } from 'src/app/components/cities-search/cities-search.component';
import { LoadingService } from 'src/app/manager/loading.service';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  
cityStatus : CityView  = CityView.isHome
cityName : string = "Select Your City";
cityId : number;
langName : string;
lang : string = 'en';
pageInfo ={
  startSelectCity : '',any :'',items :''

  };
  constructor(public modalController: ModalController, 
    private loader : LoadingService,
    private navCtrl : NavController ,
     private storage : AppStorageService
     ,  private _translate : TranslateService,public events: Events) {}


     ngOnInit() {
      
    }
ionViewDidEnter(){
  this.storage.getLang().then(lang=>{
    if(lang){
      this.lang = lang.name;
    }
    this._initialiseTranslation();
})
  this.storage.getUserData().then(res=>{
    if(!res){
      this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
    }
    
  })
  this.storage.getCity().then(res=>{
    if(res){
      this.cityName = res.name
      this.cityId = res.id;
      this.cityStatus = CityView.IsCityAvalibel;
    }
  })
}


private _translateLanguage() : void
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
}

 openbasket(){
   this.navCtrl.navigateForward("orders")
 }

 openhistory(){
  this.navCtrl.navigateForward("basket-history")
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
    
    }, 250);
 }
}


export enum CityView {
  isHome = 1,
  IsCityAvalibel = 2,
  IsCityUnavalibel = 3
  
}