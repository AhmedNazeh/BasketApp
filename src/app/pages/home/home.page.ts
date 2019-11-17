import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CitiesSearchComponent } from 'src/app/components/cities-search/cities-search.component';
import { LoadingService } from 'src/app/manager/loading.service';
import { AppStorageService } from 'src/app/manager/app-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  
cityStatus : CityView  = CityView.isHome
cityName : string = "Select Your City";
cityId : number;
  constructor(public modalController: ModalController, 
    private loader : LoadingService,
    private navCtrl : NavController ,
     private storage : AppStorageService) {}


     ngOnInit() {
      
    }
ionViewDidEnter(){
  this.storage.getCity().then(res=>{
    if(res){
      this.cityName = res.name
      this.cityId = res.id;
      this.cityStatus = CityView.IsCityAvalibel;
    }
  })
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
}
export enum CityView {
  isHome = 1,
  IsCityAvalibel = 2,
  IsCityUnavalibel = 3
  
}