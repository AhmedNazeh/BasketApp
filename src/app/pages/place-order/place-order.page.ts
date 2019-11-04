import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  step: number = 1;
  notes : string;
  signupform: FormGroup;
  orderData = { "username": "", "password": "","phone":"","email" : "","name":""};
  constructor(private route: ActivatedRoute) {
  
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.notes = params["notes"];
      console.log(this.notes)
    });

    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let MOBILEPATTERN = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
   this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      phone : new FormControl('', [Validators.required, Validators.pattern(MOBILEPATTERN)]),
     });
  }

sendOrder(){
  
}

}
