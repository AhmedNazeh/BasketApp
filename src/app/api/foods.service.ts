import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(private global : GlobalService) { }

  getAllRest(data){
    return this.global.post("cityrests",data,{});
  }

  getFoodsByRestId(data){
    return this.global.post("singlerest",data,{});
  }
}
