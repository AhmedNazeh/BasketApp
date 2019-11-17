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

  getContactDetails(){
    return this.global.get('contactdetails/en',{},{});
  }

  getSinglePage(model){
    return this.global.post('singlepage',model,{});
  }
  getAllPage(){
    return this.global.get('allpages/en',{},{});
  }
}
