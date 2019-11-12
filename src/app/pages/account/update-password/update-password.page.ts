import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/api/account.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {
  public changePasswordForm: FormGroup;
  userId:string ;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private accountService: AccountService) {
    
    this.route.queryParams.subscribe(params => {
      this.userId = params["userId"];
      
    });
  }
  ngOnInit() {
    this.buildForm();
  }
  public buildForm(): void {
    
    this.changePasswordForm = this.formBuilder.group({
      currentpass: [
        "",
        Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])
      ],
      password_confirmation: [
        "",
        Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])
      ],
    }, {
      validator: this.MatchPassword // Inject the provider method
    });
   }
   private MatchPassword(AC: AbstractControl) {
    const newPassword = AC.get('password').value // to get value in input tag
    const confirmPassword = AC.get('password_confirmation').value // to get value in input tag
     if(newPassword != confirmPassword) {
         console.log('false');
         AC.get('password_confirmation').setErrors( { MatchPassword: true } )
     } else {
         console.log('true')
         AC.get('password_confirmation').setErrors(null);
     }
 }


 submit(){
   let model = this.changePasswordForm.value;
   model.user_id = this.userId;
   
   this.accountService.changePassword(model)
 }
}
