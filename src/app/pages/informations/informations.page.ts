import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/api/info.service';
import { LoadingService } from 'src/app/manager/loading.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {
pageName :string ="sd";
data :any;
id :any;
  constructor( private info : InfoService, private loader : LoadingService,private route: ActivatedRoute) { }

  ngOnInit() {
  }

 ionViewDidEnter(){
   //this.route.snapshot.paramsbundleRenderer.renderToStream
  //  this.id= this.route.snapshot.params.paramValue;
  //  console.log(this.id)

  this.route.params.subscribe(params => {
  this.id = params["id"];
    console.log(this.id)
    switch (this.id) {
      case "1":
        this.pageName ="Terms of use"
        break;
      case "2":
        this.pageName ="Privacy Policy"
        break;
      case "3":
        this.pageName ="About Us"
        break;
      default:
        this.pageName ="";
        break;
    }
    this.loader.presentLoading();
    this.info.getSinglePage({page_id:this.id,lang:'en'}).then(res=>{
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
 }

}
