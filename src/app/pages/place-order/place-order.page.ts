import { AppStorageService } from 'src/app/manager/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/manager/loading.service';
import { CitiesService } from 'src/app/api/cities.service';
import { NavController } from '@ionic/angular';
import { OrdersService } from 'src/app/api/orders.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  step: number = 1;
  phone : string ;
  notes : string;
  cities: any[];
  cityId:number;
  cityName : string;
  image : any   
  userId : any;
  address_title : string = ''

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

    let user =  this.storage.getUserData().then(re=>{
      if(!re){
        this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
      }
      console.log(re)
      this.phone = re.phone;
      this.userId = re.id
    })

    this.storage.getCity().then(res=>{
      if(res){
      
        this.cityId = res.id;
        this.cityName= res.name;
      
      }
    }).then(()=>{
      this.initializeCity()
    })

   
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
  let order = {lang : 'en',city_id : this.cityId,user_id : this.userId,notes : this.notes,
  image : this.image,platform :'ios',total : this.step ,address_title: this.address_title};
    console.log(order)
  this.loader.presentLoading();
     this.orderSerice.order(order).then(res=>{
    
       console.log(res)
       let data = JSON.parse(res.data)
       console.log(data)

       if(data.Status.Succeed == 0){
        this.loader.presentToast( data.Status.message);
        return false;
     }else{
      let navigationExtras: NavigationExtras = {
        queryParams: {
            orderId: data.Result.order_id,
           
        }
    };
    
      this.navCtrl.navigateRoot(['thanks'],navigationExtras)
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
  console.log(this.cityId)
  if(this.cities){
    this.cityName= this.cities.find(x=>x.id == this.cityId).nane
    let citydata = {id:this.cityId,name : this.cityName};
    this.storage.setCity(citydata);
  }

}

}
