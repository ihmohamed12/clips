import { Component,OnInit ,OnDestroy,Input,OnChanges,Output,EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/sercices/clip.service';
import { ModalService } from 'src/app/sercices/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,OnDestroy,OnChanges {

@Input()
activeClip:IClip|null=null
@Output()
update=new EventEmitter()
alerMessage: string ='please wait uploading'
showAlert=false
color: string ='blue'
uploading=false

constructor(
  private modal:ModalService,
  private ClipService:ClipService
  ){

}

group =  new FormGroup({
  title : new FormControl('',
 {
    validators:[
      Validators.required,
      Validators.minLength(3)
    ],nonNullable:true
  
  }),
  id: new FormControl('',
  {
     validators:[
       Validators.required,
     ],nonNullable:true
   
   })
});


  ngOnDestroy(): void {
    this.modal.unRegister('editClip')
    
  }
  ngOnInit(): void {
    this.modal.register('editClip')
  }
  ngOnChanges(): void {
   if(!this.activeClip){
    return
   }
   this.group.controls.id.setValue(this.activeClip.docID!)
   this.group.controls.title.setValue(this.activeClip.title)    
  }

  async submit() {
  if(!this.activeClip)
{
  return
}
    this.color ='blue'
    this.alerMessage ='please wait uploading'
    this.showAlert=true
    this.uploading=true
try{
  await  this.ClipService.updateClip(this.group.controls.id.value,this.group.controls.title.value)

} 
catch(e){
  this.uploading=false
  this.color='red'
  this.alerMessage='failed'
  return
  }
  this.activeClip.title=this.group.controls.title .value
  this.update.emit(this.activeClip)
  this.uploading=false
    this.showAlert=false
    this.color='green'
  this.alerMessage='success'  
    }
  

}
