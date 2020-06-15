import { AppStorageService } from 'src/app/manager/app-storage.service';
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
    , private storage : AppStorageService
    ) { }

  ngOnInit() {
    timer(4500).subscribe(() =>{
     let user =  this.storage.getUserData().then(re=>{
       console.log(re)
       this.navCtrl.navigateRoot(['home'],{skipLocationChange:false,replaceUrl:true})

      //  if(re && re !=null){
      //   this.navCtrl.navigateRoot(['home'],{skipLocationChange:false,replaceUrl:true})

      //  }else{
      //   this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})

      //  }
     }).catch(err=>{
       console.log(err)
      this.navCtrl.navigateRoot(['auth'],{skipLocationChange:false,replaceUrl:true})

     })
    
    }) 

  }

}
