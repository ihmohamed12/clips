import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'
import { UploadComponent } from './upload/upload.component';
import { ClipComponent } from '../clip/clip.component';


const redirectUnauthorizedToHome = ()=>redirectUnauthorizedTo('')
const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'manage-clips',
    redirectTo: 'manage'
  },
  {
    component:UploadComponent,
    path:'upload',
    data:{
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    canActivate:[AngularFireAuthGuard]

  },
  {
    path:'clip/:id',
    component:ClipComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
