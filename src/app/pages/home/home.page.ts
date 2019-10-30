import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CitiesSearchComponent } from 'src/app/components/cities-search/cities-search.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {}

 
  async presentModal() {
    const modal = await this.modalController.create({
    component: CitiesSearchComponent,
   // componentProps: { value: 123 }
    });
  
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data)
  
  }
}
