import { Component } from '@angular/core';
import { ModalService } from '../sercices/modal.service';
import { AuthService } from '../sercices/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

constructor(
  public modal:ModalService,
  public auth:AuthService,
  ){

}  
openModal(event:Event){
  event.preventDefault()
  this.modal.toggoleModal('auth')
    
}


}
