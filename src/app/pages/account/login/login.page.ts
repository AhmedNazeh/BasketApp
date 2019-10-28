import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/api/account.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 cities :  Observable<any>
  constructor(private accountService: AccountService) { 
    
   this.accountService.getCitiesInfo().subscribe(result=>{

     this.cities = result;
     console.log(this.cities)
   });
  
  }

  ngOnInit() {

  }
  ionViewDidLoad(){
   
  }

}
