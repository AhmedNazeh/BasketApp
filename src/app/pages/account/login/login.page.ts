import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/api/account.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private accountService: AccountService) { 
    
  
  
  }

  ngOnInit() {

  }
  ionViewDidLoad(){
   
  }

}
