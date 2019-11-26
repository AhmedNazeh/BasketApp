import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {
  orderId : string ;
  pageInfo ={
    thankMsg : '',receivedMsg :'',orderNumberMsg :'', done : ''
    };
  constructor(public navCtrl : NavController,private route: ActivatedRoute,  private _translate : TranslateService) { 
    this.route.queryParams.subscribe(params => {
      this.orderId = params["orderId"];
      
  });
  }

  ionViewDidEnter(){
   this._initialiseTranslation();
  }

  ngOnInit() {
   
  }
  openOrders(){
    this.navCtrl.navigateRoot(['basket-history'],{skipLocationChange:false,replaceUrl:true})

  }
  private _initialiseTranslation() : void
 {

    setTimeout(() =>
    {
       this.pageInfo.thankMsg   = this._translate.instant("thanksPage.thankMsg");
       this.pageInfo.receivedMsg = this._translate.instant("thanksPage.receivedMsg");
       this.pageInfo.orderNumberMsg = this._translate.instant("thanksPage.orderNumberMsg");
       this.pageInfo.done = this._translate.instant("thanksPage.done");
      
    }, 250);
 }
}

