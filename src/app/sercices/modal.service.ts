import { Injectable } from '@angular/core';

interface IModal{
  id:string;
  visible:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals:IModal[]=[]


  constructor() { }

  isModalOpen(ID:string):boolean{
   return Boolean( this.modals.find(x=>x.id==ID)?.visible);
  }
  toggoleModal(ID:string){
    const modal =this.modals.find(x=>x.id==ID)
    if(modal){
      modal.visible=!modal.visible
    }

  }
  register(ID:string){
    this.modals.push({ id:ID,visible: false })

  }
  unRegister(ID:string){
    this.modals = this.modals.filter(
      x=>x.id != ID
    );

  }
  
}
