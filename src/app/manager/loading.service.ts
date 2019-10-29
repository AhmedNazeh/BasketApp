import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: any;
  isloading: boolean = false;
  constructor(public Loading: LoadingController,public toastCtrl: ToastController) {
    // console.log('Hello LoadingProvider Provider');
  }

  async presentToast(message, setting?: ToastOptions)  {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      ...setting
    }
    );

    return (await toast).present();
  }

 async presentLoading() {
    if (this.isloading == false) {
      this.isloading = true;
      this.loading = this.Loading.create({
        spinner: "bubbles",      
         showBackdrop: true
       
      }).then(x=>{
        x.present();
      }); 
     
    }
  }
  presentLoadingUpload() {
    if (this.isloading == false) {
      this.loading = this.Loading.create({
       // content: "",
         showBackdrop: false,
        spinner: "bubbles"
      }).then(s=>{
        s.present()
        s.dismiss().catch()
      });
      this.isloading = true;
    
    }
  }

  // Hide loading option
  async hideLoading() {
    if (this.isloading == true) {
      this.isloading = false;
      return this.Loading.dismiss().catch()
    }
  }

  validateForm(form: FormGroup) {
    const formFields = Object.keys(form.value);
    return formFields.every((formField) => {
      if (form.get(formField).getError('required')) {
        this.presentToast(`you have to enter' ${formField}`);
        return false;
      } else if (form.get(formField).getError('unconfirmedpass')) {
        this.presentToast('passwords must be identical')
      } else if (form.get(formField).getError('minlength')) {
        this.presentToast(`${formField} must be' ${form.get(formField).getError('minlength').requiredLength} letters at least')}`);
        return false;
      } else if (form.get(formField).getError('pattern')) {
        this.presentToast(`you have to insert right value to')} ${formField}`);
        return false;
      } else {
        return true;
      }
    });
  }
}