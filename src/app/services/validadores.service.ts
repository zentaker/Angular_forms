import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if (!control.value) {
      //en el caso que no tenga ningún valor resolver null
      return Promise.resolve(null); // para que al hacer refresh no llame 
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({existe: true})
        } else {
          resolve(null)
        }

      }, 3500)
    })
    
  }

  //una collecion que regresa un objeto

  noHerrera(control: FormControl): ErrorValidate  {

    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      }
      
      
      
    }
    return null;

  }
  camposIguales( campo1 :string, campo2: string ) {
    
    return (control: AbstractControl): ValidationErrors | null => {
 
      const pass1 = control.get(campo1)?.value;
      const pass2 = control.get(campo2)?.value;
  
     
  
      if ( pass1 !== pass2 ) {
        control.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true };
      }
      
      return null;
    }
  }
}
