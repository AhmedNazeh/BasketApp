import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(private global : GlobalService) { }

  getAllRest(lang){
    return this.global.get("allrest/"+lang,{},{});
  }

  getFoodsByRestId(data){
    return this.global.post("singlerest",data,{});
  }
}
