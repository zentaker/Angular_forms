import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Alejandro',
    apellido: 'Palomino',
    correo: 'apalomino12@icloud.com',
    pais: 'CRI',
    genero: ''
  }
  paises: any[] = [];

  constructor(private PaisService: PaisService) { }

  ngOnInit(): void {
    //peticion http para traer la informacion de los paises
    this.PaisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;
        //agregar un nuevo elemento a la primera pocicion del arrreglo
        this.paises.unshift({
          nombre: '[ Seleccione pais ]',
          codigo: ''
          
        })


    
        
      });
  }

  guardar(forma: NgForm) {
    console.log(forma);

    if (forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
    console.log(forma.value);
  }

}
