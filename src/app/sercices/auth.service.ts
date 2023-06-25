import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Observable,  filter, map, of, switchMap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection:AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean> 
  public isAuthenticatedWithDelay$: Observable<boolean> 
  private redirect = false;




  constructor(
    private auth:AngularFireAuth,
    private db:AngularFirestore,
    private route:Router,
    private activeRoute:ActivatedRoute ,
    private zone: NgZone 
    ){
      this.userCollection = this.db.collection("users")
      
    this.isAuthenticated$=  auth.user.pipe(
      map(user=>!!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      map(user=>!!user)

    )
    this.route.events.pipe(
      filter(e=>e instanceof NavigationEnd),
      map(e=>this.activeRoute.firstChild),
      switchMap(activeRoute=> activeRoute?.data ?? of({}) )
    ).subscribe((data:any)=>{
      this.redirect = data.authOnly ??false

    })

  }
  public async creatUser(userData:IUser){
    const userCred= await this.auth.createUserWithEmailAndPassword(
      userData.email as string,userData.password as string
     )
     if(!userCred.user){
      throw new Error("no user");
      
     }
  await this.userCollection.doc(userCred.user.uid).set({
      name:userData.name,
      email:userData.email,
      age:userData.age,
      phoneNumber:userData.phoneNumber,
      
     })
    await userCred.user.updateProfile({
      displayName:userData.name
     })
  }


  public async logout($event?:Event){
    if($event){
      $event.preventDefault()

    }
  await  this.auth.signOut()

  if(this.redirect){
    await   this.route.navigateByUrl('/');
   
}
  }
}
