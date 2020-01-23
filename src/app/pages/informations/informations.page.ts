import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/api/info.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {
pageName :string ="sd";
data :any;
id :any;
lang : string = 'ar';
pageInfo = {terms : '', about : '', privacy : ''}
  constructor( private info : InfoService, private loader : LoadingService,
    private route: ActivatedRoute,
    private _translate : TranslateService , private storage : AppStorageService) { }

  ngOnInit() {
  }

 ionViewDidEnter(){
   //this.route.snapshot.paramsbundleRenderer.renderToStream
  //  this.id= this.route.snapshot.params.paramValue;
  //  console.log(this.id) 
  this.storage.getLang().then(lang=>{
   
    if(lang){
      this.lang = lang.name;
    }
    this.route.params.subscribe(params => {
      this.id = params["id"];
        console.log(this.id)
        switch (this.id) {
          case "1":
            this.pageName = this._translate.instant("informationPage.termsOfUs")
            break;
          case "2":
            this.pageName = this._translate.instant("informationPage.Privacy")
            break;
          case "3":
            this.pageName = this._translate.instant("informationPage.About")
            break;
          default:
            this.pageName ="";
            break;
        }
        this.loader.presentLoading();
        this.info.getSinglePage({page_id:this.id,lang: this.lang}).then(res=>{
          let data = JSON.parse(res.data)
          console.log(data)
          this.data = data.Result.page;
          console.log(this.data)
        }).finally(()=>{
          this.loader.hideLoading();
        }).catch(err=>{
          console.log(err);
          this.loader.presentToast("something went wrong")
          this.loader.hideLoading();
        })
    });

   
})

  
 }

 private _initialiseTranslation() : void
 {
    setTimeout(() =>
    {
       this.pageInfo.terms   = this._translate.instant("informationPage.termsOfUs");
       this.pageInfo.privacy = this._translate.instant("informationPage.Privacy");
       this.pageInfo.about = this._translate.instant("informationPage.About");
     
    }, 250);
 }

}
