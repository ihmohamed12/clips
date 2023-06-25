import { AbstractControl,  ValidationErrors,ValidatorFn } from "@angular/forms";

export class RegisterValidators {




    


    static  match(controlName:string,MatchingControlName:string):ValidatorFn{
        return (group:AbstractControl):ValidationErrors|null=>{
            const control= group.get(controlName)
            const matchingControl = group.get(MatchingControlName)

            if(!control||!matchingControl){
                console.error('form Controls not found')
                return{controlNotFound:false}
            }
            const error = control.value==matchingControl.value? 
            null:{noMatch:true}

            matchingControl.setErrors(error)
            return error
        }
    }



}
