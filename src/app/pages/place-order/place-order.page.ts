import { AppStorageService } from 'src/app/manager/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/manager/loading.service';
import { CitiesService } from 'src/app/api/cities.service';

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
  constructor(private route: ActivatedRoute,private storage : AppStorageService,
     public cityService:CitiesService,
    private loader : LoadingService) {
  
   }

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.notes = params["notes"];
      console.log(this.notes)
    });

    let user =  this.storage.getUserData().then(re=>{
      this.phone = re.phone;
      
    })

    this.storage.getCity().then(res=>{
      if(res){
      
        this.cityId = res.id;
        this.cityName= res.name;
      
      }
    })

    this.initializeCity()
  }
    
  initializeCity() {
    this.loader.presentLoading();
     this.cityService.getCities().then(res=>{
    
       console.log(res)
       let data = JSON.parse(res.data)
       this.cities = data.Result.cities ; 
       console.log(this.cities)
 
     }).finally(()=>{
       this.loader.hideLoading();
     })

}

sendOrder(){
  
}
codeSelected(){
  console.log(this.cityId)
 this.cityName= this.cities.find(x=>x.id == this.cityId).nane
 let citydata = {id:this.cityId,name : this.cityName};
 this.storage.setCity(citydata);
}

}
