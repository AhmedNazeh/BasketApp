import { LoadingService } from 'src/app/manager/loading.service';
import { InfoService } from './../../api/info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  faqs : Array<any> = [];
  constructor(private info : InfoService , private loader : LoadingService) { }

  ngOnInit() {
    this.getInfo()
  }
getInfo(){
  this.loader.presentLoading();
  this.info.getfaqs().then(res=>{
    let response =JSON.parse(res.data);
    if(response.Result.ques.length > 0){
      this.faqs.push(response.Result.ques ) ;

    }
    console.log(this.faqs)
  }).finally(()=>{
    this.loader.hideLoading();
  }).catch(err=>{
    console.log(err);
    this.loader.hideLoading();

  })
}
}
