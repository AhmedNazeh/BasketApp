import { UserData } from './../../manager/app.types';
import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/manager/app-storage.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage implements OnInit {
user : UserData = {} as UserData
  constructor(private storage : AppStorageService) { }

  ngOnInit() {
    this.storage.getUserData().then(res=>{
      this.user = res;
 
    })
  }


}
