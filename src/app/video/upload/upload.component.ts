import { Component,OnDestroy } from '@angular/core';
import { AngularFireStorage ,AngularFireUploadTask} from '@angular/fire/compat/storage';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { v4 as uuid} from 'uuid';
import { last,switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase  from 'firebase/compat/app';
import { ClipService } from 'src/app/sercices/clip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {

  
isDragOver=false
file:File|null= null
nextStep = true
uploading=false
showAlert=false
alerMessage="File uploading"
color ='green'
percentage =0
showPercentage =false
user:firebase.User|null=null
task?:AngularFireUploadTask

group =  new FormGroup({
  title : new FormControl('',
 {
    validators:[
      Validators.required,
      Validators.minLength(3)
    ],nonNullable:true
  
  }),

});



constructor(
  private storage:AngularFireStorage,
  private auth:AngularFireAuth,
  private clipsService:ClipService,
  private route:Router
  ){
    auth.user.subscribe(
      user=>this.user=user
    )
}
  ngOnDestroy(): void {
    this.task?.cancel
  }

storeFile($event:Event){
  this.isDragOver=false
  this.file = ($event as DragEvent).dataTransfer?
  ($event as DragEvent).dataTransfer?.files.item(0)??null:
  ($event.target as HTMLInputElement).files?.item(0)??null

  if(!this.file||this.file.type!=='video/mp4'){
    return
  }
  this.group.controls.title.setValue(this.file.name.replace(/\.[^/.]+$/,''))
  this.nextStep=false

}
uploadFile(){
  this.group.disable()
  this.uploading=true
  this.color =  'blue'
  this.alerMessage="File uploading"
  this.showAlert=true
  this.showPercentage=true

  const clipFileName = uuid()
  const clipPath=`clips/${clipFileName}.mp4`

  this.task = this.storage.upload(clipPath,this.file)
  const clipRef = this.storage.ref(clipPath)

  this.task.percentageChanges().subscribe(
    progress =>{
      this.percentage = (progress as number)/100
    })
    this.task.snapshotChanges().pipe(
      last(),
      switchMap(
        ()=>clipRef.getDownloadURL()
      )
    ).subscribe(
      {
        next:async(url)=>{
          const clip={
            uid:this.user?.uid as string,
            displayname:this.user?.displayName as string,
            title:this.group?.value.title as string,
            fileName:`${clipFileName}.mp4`,
            url,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
            
          }
      const clipRef=  await  this.clipsService.createClip(clip)
      setTimeout(()=>{
        this.route.navigate([
          'clip',clipRef.id
        ])
      },1000)

          this.color='green'
          this.alerMessage='succsess'
          this.showPercentage=false
        },
        error:(error)=>{
  this.color='red'
          this.alerMessage='upload failed'
          this.uploading=true
          this.showPercentage=false
          console.log(error)
}
      }
    )
 
}

}
