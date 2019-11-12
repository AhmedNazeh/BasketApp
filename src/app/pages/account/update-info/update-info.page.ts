import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserData } from 'src/app/manager/app.types';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { AccountService } from 'src/app/api/account.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.page.html',
  styleUrls: ['./update-info.page.scss'],
})
export class UpdateInfoPage implements OnInit {
  updateform: FormGroup;
  user : UserData = {} as UserData
  constructor(private storage : AppStorageService,private accountService : AccountService) { }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let MOBILEPATTERN = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
   this.updateform = new FormGroup({
   
   name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
   email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
   phone : new FormControl('', [Validators.required, Validators.pattern(MOBILEPATTERN)]),
  });
    this.storage.getUserData().then(res=>{
      this.user = res;
 
    }).then(()=>{
      this.updateform.get('name').setValue(this.user.name);
      this.updateform.get('email').setValue(this.user.email);
      this.updateform.get('phone').setValue(this.user.phone);

    })
//
  }
  updateinfo(){
    let model = this.updateform.value;
    model.user_id = this.user.id;
    console.log(model)
    this.accountService.UpdateInfo(model)
  }
}
