import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/sercices/clip.service';
import { ModalService } from 'src/app/sercices/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  VideoOrder:string = '1'
  paramsObject:any  
  clips:IClip[]=[]
  activeClip:IClip|null=null
  sort$:BehaviorSubject<string>

constructor(
  private router:Router,
  private route:ActivatedRoute,
  private clipsService:ClipService,
  private modal:ModalService
  ){
    this.sort$  = new BehaviorSubject<string>(this.VideoOrder)

} 
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(
      (params:Params)=>{
        this.VideoOrder = params['sort'] ==='2'?  params['sort']:'1'
        this.sort$.next(this.VideoOrder)
      })
     this.clipsService.getUserClips(this.sort$).subscribe(docs=>{

      this.clips=[]
      docs.forEach(doc => {
        this.clips.push({
          docID: doc.id,   
          ...doc.data()
        })
          console.log(this.clips[0].title)
      });
     })
     
  
  }
  sort(event: Event) {  
     const {value } =(event.target as HTMLSelectElement)
     //`/manage?sort=${value}`
     this.router.navigate([],{
      relativeTo:this.route,
      queryParams:{
        sort:value,
        
      }
     })
    
 }

 openModal($event:Event,clip:IClip){
  $event.preventDefault()
  this.activeClip=clip
  this.modal.toggoleModal('editClip')
 }
 update($event: IClip) {
  this.clips.forEach((element,index)=>{
    if(element.docID==$event.docID){
      this.clips[index].title= $event.title
    }

  })
  }

  deletClip($event:Event,clip:IClip){
    $event.preventDefault()
    this.clipsService.deleteClops(clip)
   this.clips.forEach((element,index)=>{
    if(element.docID==clip.docID){
      this.clips.splice(index,1)
    }
   })
    }
    
}
