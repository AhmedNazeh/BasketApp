import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CitiesService } from 'src/app/api/cities.service';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/manager/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';

@Component({
  selector: 'app-cities-search',
  templateUrl: './cities-search.component.html',
  styleUrls: ['./cities-search.component.scss'],
})
export class CitiesSearchComponent implements OnInit {
  lang : string = 'ar';
  searchQuery: string = '';
  cities: any[];
  pageInfo ={
    cityTitle : ''
  
    };
  ngOnInit() {
   
  }

  constructor(public modalCtrl : ModalController, public cityService:CitiesService,
     private loader : LoadingService,private _translate : TranslateService 
     , private storage : AppStorageService) {
  
  }
ionViewDidEnter(){
  debugger;
  this.storage.getLang().then(lang=>{
    debugger;
    if(lang){
      this.lang = lang.name;
      if(this.lang === 'ar'){
        this.pageInfo.cityTitle ="اختر مدينتك";
      }else{
        this.pageInfo.cityTitle ="Select You City";
      }
    }

    this.initializeItems(this.lang);

  
  })
 
}
  initializeItems(lang) {
   this.loader.presentLoading();
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

    // this.cities = [
    //   {id:1,name :'Tanta'},
    //   {id:1,name :'Giza'},
  
    // ];
  }
  
  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.cities = this.cities.filter((item) => {
        return (item.nane.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  dismiss(item) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'selected' : item
    });
  }


}
