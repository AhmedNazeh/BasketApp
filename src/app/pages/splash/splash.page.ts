import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import{NavController} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private navCtrl: NavController,private statusBar: StatusBar
    ) { }

  ngOnInit() {
    timer(4500).subscribe(() =>{
      this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})
    }) 

  }

}
