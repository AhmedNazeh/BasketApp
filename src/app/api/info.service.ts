import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private global : GlobalService) { }

  getfaqs(){
    return this.global.get('faqs/en',{},{});
  }
}
