import { Component ,OnInit,OnDestroy} from '@angular/core';
import { ModalService } from 'src/app/sercices/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit,OnDestroy {
  constructor(public modal:ModalService){

  }
  ngOnDestroy(): void {
    this.modal.unRegister('auth')

  }
  ngOnInit(): void {
    this.modal.register('auth')

  }

}
