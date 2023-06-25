import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

if(environment.production){
  enableProdMode();
}

firebase.initializeApp(environment.firebase);

firebase.auth().onAuthStateChanged(()=>{
 let appinit = false

if(!appinit){
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

}
appinit=true;
});
