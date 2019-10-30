import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CitiesSearchComponent } from './cities-search/cities-search.component';



@NgModule({
  declarations: [CitiesSearchComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents:[CitiesSearchComponent]
})
export class ComponentsModule { }
