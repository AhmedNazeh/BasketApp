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

  constructor(private route: ActivatedRoute) {
  
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.notes = params["notes"];
      console.log(this.notes)
    });

  }

sendOrder(){
  
}

}
