import { AbstractControl,  AsyncValidator,  ValidationErrors,ValidatorFn } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class EmailTaken implements AsyncValidator {
constructor(private auth:AngularFireAuth){

}
    validate=(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=> {
       return this.auth.fetchSignInMethodsForEmail(control.value).then(
            reponse=>reponse.length ?  {emailTaken:true}:null
        )
    }
    /*registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }*/

}
