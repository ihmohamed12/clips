import { Component, } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/sercices/auth.service';
import { RegisterValidators } from '../validators/register-validators'; 
import { EmailTaken } from '../validators/email-taken';

 @Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private auth:AuthService,
    private emailTaken:EmailTaken
    ){

  }
  showAlert=false;
  alertColor='blue'
  alerMessage='registeration prossing'
  inSubmtion = false;
  
registerForm = new FormGroup({
  name : new FormControl('',
  [
    Validators.required,
    Validators.minLength(3)
  
  ]),
  email : new FormControl('',[
    Validators.required,
    Validators.email,
    
  ],[this.emailTaken.validate]),
  age : new FormControl<number|null>(null,[
    Validators.required,
    Validators.min(18),
    Validators.max(120),

  ]),
  password : new FormControl('',
  [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ],
  ),
  confirmPassword : new FormControl('',[
    Validators.required,

  ]),
  phoneNumber : new FormControl('',[
    Validators.required,
    Validators.minLength(13),
    Validators.max(13)

  ]),


},
[ 
  RegisterValidators.match("password","confirmPassword")
]);

   async register() {
  this.showAlert=true;
  this.alerMessage='registeration prossing'
  this.alertColor='blue'
  this.inSubmtion=true
  
  try{
    this.auth.creatUser(this.registerForm.value as IUser) 
  }
  catch(e){
    console.log(e);
    this.alerMessage = "an uexpected error occured"
    this.alertColor="red"
    this.inSubmtion=false
    return;

  }
  this.alerMessage = "account creater"
  this.alertColor="green"

  }
}
