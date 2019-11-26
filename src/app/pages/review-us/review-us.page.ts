import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfoService } from 'src/app/api/info.service';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-review-us',
  templateUrl: './review-us.page.html',
  styleUrls: ['./review-us.page.scss'],
})
export class ReviewUsPage implements OnInit {
  reviewform: FormGroup;
  user_id : number;
  pageInfo ={
    reviewTitle : '',reviewHeader :'',rateValid :'', reviewPlaceholder : '',reviewValid :'',
    send:''
    };
  constructor(private info :InfoService, private storage : AppStorageService,  private _translate : TranslateService) { }

  ionViewDidEnter(){
    this._initialiseTranslation();
  }
  ngOnInit() {
    
    this.reviewform = new FormGroup({
    star: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
   
   });

 
   this.storage.getUserData().then(res=>{
    if(res){ 
      this.user_id = res.id;
    }else{
      this.user_id = 0;
    }
    

  })
  }
  onModelChange(event) {
    
    console.log('Your rate:', event);
  }

  sendReview(){
    console.log(this.reviewform.value)
    let model = this.reviewform.value
    model.user_id = this.user_id;
    this.info.sendReview(model);
  }

  
 private _initialiseTranslation() : void
 {
 
    setTimeout(() =>
    {
       this.pageInfo.reviewTitle   = this._translate.instant("reviwePage.reviewTitle");
       this.pageInfo.reviewHeader = this._translate.instant("reviwePage.reviewHeader");
       this.pageInfo.rateValid = this._translate.instant("reviwePage.rateValid");
       this.pageInfo.reviewPlaceholder = this._translate.instant("reviwePage.reviewPlaceholder");
       this.pageInfo.reviewValid = this._translate.instant("reviwePage.reviewValid");
       this.pageInfo.send = this._translate.instant("reviwePage.send");
    }, 250);
 }
}
