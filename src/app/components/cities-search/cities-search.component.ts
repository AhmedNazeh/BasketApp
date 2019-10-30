import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cities-search',
  templateUrl: './cities-search.component.html',
  styleUrls: ['./cities-search.component.scss'],
})
export class CitiesSearchComponent implements OnInit {

  searchQuery: string = '';
  items: any[];
  ngOnInit() {}

  constructor(public modalCtrl : ModalController) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      {id:1,name :'Tanta'},
      {id:1,name :'Giza'},
   
    ];
  }
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
