import { LoadingService } from 'src/app/manager/loading.service';
import { InfoService } from './../../api/info.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  faqs : Array<any> = [];
  pageTitle :string = ''
  lang : string = 'ar';
  constructor(private info : InfoService ,
     private loader : LoadingService ,
      private _translate : TranslateService
      , private storage : AppStorageService) { }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.storage.getLang().then(lang=>{
      if(lang){
        this.lang = lang.name;
      }
      this.getInfo(this.lang)
    })
    this.pageTitle =  this._translate.instant('aboutUsPage.aboutUsTitle');
  }
getInfo(lang){
  this.loader.presentLoading();
  this.info.getfaqs(lang).then(res=>{
    let response =JSON.parse(res.data);
    if(response.Result.ques.length > 0){
      this.faqs.push(response.Result.ques ) ;

    }
    console.log(this.faqs)
  }).finally(()=>{
    this.loader.hideLoading();
  }).catch(err=>{
    console.log(err);
    this.loader.presentToast("something went wrong")
    this.loader.hideLoading();

  })
}
}
