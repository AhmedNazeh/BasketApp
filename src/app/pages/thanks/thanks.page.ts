import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {
  orderId : string ;
  constructor(public navCtrl : NavController,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.orderId = params["orderId"];
      
  });
  }

  ngOnInit() {
   
  }
  openOrders(){
    this.navCtrl.navigateRoot(['basket-history'],{skipLocationChange:false,replaceUrl:true})

  }
}
