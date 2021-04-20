import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }
  
  getPaises() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        //map de reactive extensios
        map((resp:any) => { // se utiliza el operador map para filtrar
        //la nueva salida
          return resp.map((pais:any) => { //map de javascript
            return {
              nombre: pais.name,
              codigo: pais.alpha3Code
            }
            
          })

        
        
      }))
  }
}
