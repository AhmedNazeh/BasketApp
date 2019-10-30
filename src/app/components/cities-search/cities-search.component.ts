import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CitiesService } from 'src/app/api/cities.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cities-search',
  templateUrl: './cities-search.component.html',
  styleUrls: ['./cities-search.component.scss'],
})
export class CitiesSearchComponent implements OnInit {

  searchQuery: string = '';
  cities: Observable<any>;
  ngOnInit() {
    this.initializeItems();
  }

  constructor(public modalCtrl : ModalController, public cityService:CitiesService) {
  }

  initializeItems() {
 
    this.cityService.getCities().subscribe(res=>{
      console.log(res)
      this.cities = res.Result.cities;
      console.log(this.cities)

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
