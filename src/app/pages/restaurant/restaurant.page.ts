import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  constructor(private navCtrl : NavController ) { }

  ngOnInit() {
  }
 openMenu(){
  this.navCtrl.navigateForward("food-menu")
  
 }
}
