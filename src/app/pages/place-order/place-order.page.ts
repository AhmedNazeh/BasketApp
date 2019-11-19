import { AppStorageService } from 'src/app/manager/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/manager/loading.service';
import { CitiesService } from 'src/app/api/cities.service';
import { NavController } from '@ionic/angular';
import { OrdersService } from 'src/app/api/orders.service';
import { UserData } from 'src/app/manager/app.types';

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
  constructor(private route: ActivatedRoute,private storage : AppStorageService,
     public cityService:CitiesService,private orderSerice : OrdersService,
    private loader : LoadingService , public navCtrl : NavController) {
  
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
    from_where : new FormControl('', [Validators.required, Validators.minLength(4)]),
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
      this.orderform.get('address_title').setValue(re.address_title);
      this.orderform.get('from_where').setValue(re.from_where);

    }).then(()=>{

    })
  
    this.storage.getCity().then(res=>{
      if(res){
      
        this.cityId = res.id;
        this.cityName= res.name;
        this.orderform.get('city_id').setValue(this.cityId);
      
      }
    }).then(()=>{
      this.initializeCity()
    })

    this.orderform.get('notes').setValue(this.notes);
   
  }
    
  initializeCity() {
   // this.loader.presentLoading();
     this.cityService.getCities().then(res=>{
    
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
  model.lang = 'en';
  model.user_id = this.userId;
  if(this.image){
    model.image = this.image;

  }else{
    model.image = "";

  }
  model.total = this.step;
  model.platform = 'ios';
 
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

}
