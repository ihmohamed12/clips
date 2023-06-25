import { Component ,OnInit} from '@angular/core';
import { AuthService } from './sercices/auth.service';

//import { ModalService } from './sercices/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {



  constructor(public auth:AuthService){

  } 
  /* constructor(public modal:ModalService){

  }
showModal=true;
ngOnInit(): void {
    setInterval(()=>{this.showModal=!this.showModal
    console.log(this.modal.modals)
    },1000)
}*/
}
