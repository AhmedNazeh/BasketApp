import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/api/account.service';
import { LoadingService } from 'src/app/manager/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private accountService : AccountService, private loader : LoadingService) { }

  ngOnInit() {
   
  }

  register(form){

    console.log(form.value)
    this.loader.presentLoading();
    
    this.accountService.register(form.value).then(result =>{
      this.loader.hideLoading();
      console.log(result);
      if(result){
        // if(result.Status.Sucsses == "1"){
          
        // }
      }
    }).catch(err=>{
      this.loader.hideLoading();
      console.log(err);
    })
  
  }
}
