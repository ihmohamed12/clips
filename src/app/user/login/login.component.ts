import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credintails={
    email:'',
    password:''
  }


  showAlert=false
  alerMessage='registeration prossing'
  alertColor='blue'
  inSubmtion=false


  constructor(private auth:AngularFireAuth){}
  async  login(){
      this.showAlert=true
      this.alertColor='blue '
      this.alerMessage='please wait'
      this.inSubmtion=true;
    try{
      console.log('before login')

     await this.auth.signInWithEmailAndPassword (
      this.credintails.email,this.credintails.password
      )

    }catch(e){
      this.inSubmtion=false;
      this.alertColor='red'
      this.alerMessage='login failed'
      return;
    }
      this.alertColor='green'
      this.alerMessage='succsess'
      console.log('after login')

  }
}
