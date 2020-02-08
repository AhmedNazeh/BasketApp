import { AppStorageService } from 'src/app/manager/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/manager/loading.service';
import { CitiesService } from 'src/app/api/cities.service';
import { NavController } from '@ionic/angular';
import { OrdersService } from 'src/app/api/orders.service';
import { UserData } from 'src/app/manager/app.types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  user : UserData = {} as UserData
  step: number = 1;
  phone : string ;
  notes : string;
  cities: any[];
  cityId:number;
  cityName : string;
  image : any   
  userId : any;
  address_title : string = ''
  orderform: FormGroup;
  lang : string = 'ar'
  pageInfo ={
    btnBasketIt : '',orderPlaceTitle :'',yourOrder :'',placheholderOrde : '',anyWhere :''
    ,anywherePlaceholder :'',city : '' ,detailsAddress : '',detailsAddressholder :'',mobile :'',mobilePlaceholder : ''
    ,orderVal :''  ,lessThan :'',eg50 : '',between : '',eg50To200 :'',moreThan :'',cash : ''
    ,eg200 :''  ,avgDelivery : ''  };
  constructor(private route: ActivatedRoute,private storage : AppStorageService,
     public cityService:CitiesService,private orderSerice : OrdersService,
    private loader : LoadingService , public navCtrl : NavController
    ,private _translate : TranslateService) {
  
   }

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.notes = params["notes"];
      this.image = params["image"];
      console.log(this.notes)
    });
    let MOBILEPATTERN = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    this.orderform = new FormGroup({
    notes: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address_title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    from_where : new FormControl(''),
    phone : new FormControl('', [Validators.required, Validators.pattern(MOBILEPATTERN)]),
    city_id :new FormControl()
  });
     
    let user =  this.storage.getUserData().then(re=>{
      if(!re){
        this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
      }
      console.log(re)
      this.user = re;
      this.phone = re.phone;
      this.userId = re.id
      this.orderform.get('phone').setValue(re.phone);
      if(re.address_title && re.address_title != null && re.address_title != "null"){
        this.orderform.get('address_title').setValue(re.address_title);

      }
      // if(re.from_where && re.from_where !=null && re.from_where !="null"){
      //   this.orderform.get('from_where').setValue(re.from_where);
      // }

    }).then(()=>{

    })
  
    this.storage.getCity().then(res=>{
      if(res){
      
        this.cityId = res.id;
        this.cityName= res.name;
        this.orderform.get('city_id').setValue(this.cityId);
      
      }
    })

    this.orderform.get('notes').setValue(this.notes);
   
  }
  ionViewDidEnter(){
    this._initialiseTranslation();
    
    this.storage.getLang().then(lang=>{   
      if(lang){
        this.lang = lang.name;
      }    
      this.initializeCity(this.lang)
    })
  }
    
  initializeCity(lang) {
   // this.loader.presentLoading();
     this.cityService.getCities(lang).then(res=>{
    
       console.log(res)
       let data = JSON.parse(res.data)
       this.cities = data.Result.cities ; 
       console.log(this.cities)
 
     }).finally(()=>{
      this.loader.hideLoading();
     }).catch(err=>{
      this.loader.presentToast("something went wrong !")
       this.loader.hideLoading();
      console.log(err)
     })

}

sendOrder(){
  let model = this.orderform.value;
  model.lang = this.lang;
  model.user_id = this.userId;
  if(this.image){
    model.image = this.image;

  }else{
    model.image = "";

  }
  model.total = this.step;
  model.platform = 'android';
 
  // let order = {lang : 'en',city_id : this.cityId,user_id : this.userId,notes : this.notes,
  // image : this.image,platform :'ios',total : this.step ,address_title: this.address_title};
    console.log(model)
  this.loader.presentLoading();
     this.orderSerice.order(model).then(res=>{
    
       console.log(res)
       let data = JSON.parse(res.data)
       console.log(data)

       if(data.Status.Succeed == 0){
        this.loader.presentToast( data.Status.message);
        return false;
     }else{
       
      this.user.address_title =  this.orderform.value.address_title;
      this.user.from_where =  this.orderform.value.from_where;
      this.storage.clearOrder();
      this.storage.saveUserData(this.user).then(()=>{
        let navigationExtras: NavigationExtras = {
          queryParams: {
              orderId: data.Result.order_id,
             
          }
      };
      
        this.navCtrl.navigateRoot(['thanks'],navigationExtras)
      })
     
     }
     }).finally(()=>{
       this.loader.hideLoading();
     }).catch(err=>{

       console.log( err)
       this.loader.hideLoading();
       this.loader.presentToast("something went wrong !")
     })
}
codeSelected(){
  console.log(this.orderform.value.city_id)
  if(this.cities){
    this.cityName= this.cities.find(x=>x.id == this.orderform.value.city_id).nane
    let citydata = {id:this.orderform.value.city_id,name : this.cityName};
    this.storage.setCity(citydata);
  }

}

private _initialiseTranslation() : void
{
  

   setTimeout(() =>
   {
      this.pageInfo.btnBasketIt   = this._translate.instant("orderPlacePage.btnBasketIt");
      this.pageInfo.orderPlaceTitle   = this._translate.instant("orderPlacePage.orderPlaceTitle");
      this.pageInfo.yourOrder   = this._translate.instant("orderPlacePage.yourOrder");
      this.pageInfo.placheholderOrde   = this._translate.instant("orderPlacePage.placheholderOrde");
      this.pageInfo.anyWhere   = this._translate.instant("orderPlacePage.anyWhere");
      this.pageInfo.anywherePlaceholder   = this._translate.instant("orderPlacePage.anywherePlaceholder");
      this.pageInfo.detailsAddress   = this._translate.instant("orderPlacePage.detailsAddress");
      this.pageInfo.detailsAddressholder   = this._translate.instant("orderPlacePage.detailsAddressholder");
      this.pageInfo.mobile   = this._translate.instant("orderPlacePage.mobile");
      this.pageInfo.mobilePlaceholder   = this._translate.instant("orderPlacePage.mobilePlaceholder");
      this.pageInfo.city   = this._translate.instant("orderPlacePage.city");
      this.pageInfo.orderVal   = this._translate.instant("orderPlacePage.orderVal");
      this.pageInfo.lessThan   = this._translate.instant("orderPlacePage.lessThan");
      this.pageInfo.eg50   = this._translate.instant("orderPlacePage.eg50");
      this.pageInfo.between   = this._translate.instant("orderPlacePage.between");
      this.pageInfo.eg50To200   = this._translate.instant("orderPlacePage.eg50To200");
      this.pageInfo.moreThan   = this._translate.instant("orderPlacePage.moreThan");
      this.pageInfo.cash   = this._translate.instant("orderPlacePage.cash");
      this.pageInfo.eg200   = this._translate.instant("orderPlacePage.eg200");
      this.pageInfo.avgDelivery   = this._translate.instant("orderPlacePage.avgDelivery");
 
   
   }, 250);
}

}
