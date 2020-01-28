import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { LoadingService } from 'src/app/manager/loading.service';
import { AppStorageService } from 'src/app/manager/app-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})

export class OrdersPage implements OnInit {
  

  notes : string = "";
  imageURI:any;
imageFileName:any;
fullName : string ="";

pageInfo ={
  orderTitle : '',hi :'',whatNeed :'',canMotot : '',orderplaceholder :'',next :'',imagePreview : ''  };
  constructor(private platform: Platform,
    private camera: Camera ,public navCtrl : NavController,
    private loader : LoadingService , private storage : AppStorageService
    , private _translate : TranslateService) { }

  ngOnInit() {
    let user =  this.storage.getUserData().then(re=>{
      this.fullName = re.name
     
     })
  }
ionViewDidEnter(){
  this.notes = '';
  this.storage.getOrders().then(orders=>{
    console.log(orders)
    if(orders){
      orders.forEach(order=>{

       
        let item = order.count + " " + order.title +" " + "( " + order.restName + " ) ";
        console.log(item)
        this.notes +=  item + `
`   ;
        console.log(this.notes)
      })
    
    }
   
 })
 this._initialiseTranslation();
}



  test(fileInput: any) {        


    var file = fileInput.target.files[0];  
    this.loader.presentToast(file.name);

  }
 openCamera(){
   this.platform.ready().then(()=>{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imageURI = imageData;
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(base64Image);
    }, (err) => {
     // Handle error
    this.loader.presentToast(err);

    });
   })
 
 }

 AccessCamera(){

  this.camera.getPicture({
 
  targetWidth:512,
 
  targetHeight:512,
 
  correctOrientation:true,
 
  sourceType: this.camera.PictureSourceType.CAMERA,
 
  destinationType: this.camera.DestinationType.DATA_URL
 
    }).then((imageData) => {
      this.imageURI ='data:image/jpeg;base64,'+ imageData;
    console.log(imageData);
 
          }, (err) => {
 
      this.loader.presentToast(err)
 
    });
 
 }
 
 AccessGallery(){
 
  this.camera.getPicture({
 
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.DATA_URL
 
    }).then((imageData) => {
 
      console.log(imageData);
      this.imageURI = 'data:image/jpeg;base64,'+ imageData;
 
         }, (err) => {
 
      console.log(err);
 
    });
 
 }

 next(){
  
  let navigationExtras: NavigationExtras = {
    queryParams: {
        notes: this.notes,
       image : this.imageURI
    }
  };
  this.navCtrl.navigateForward(['place-order'],navigationExtras)


 }
 removeImage(){
   this.imageURI = null;
 }

 private _initialiseTranslation() : void
 {

    setTimeout(() =>
    {
       this.pageInfo.orderTitle   = this._translate.instant("orderPage.orderTitle");
       this.pageInfo.hi = this._translate.instant("orderPage.hi");
       this.pageInfo.whatNeed = this._translate.instant("orderPage.whatNeed");
       this.pageInfo.canMotot = this._translate.instant("orderPage.canMotot");
       this.pageInfo.orderplaceholder = this._translate.instant("orderPage.orderplaceholder");
       this.pageInfo.next = this._translate.instant("orderPage.next");
       this.pageInfo.imagePreview = this._translate.instant("orderPage.imagePreview");
    
    }, 250);
 }
 
}
