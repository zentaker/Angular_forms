import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup ;

  constructor( private fb: FormBuilder, private validadores: ValidadoresService ) {
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
    
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }
  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }
  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }
  get usuarioNoValido() {
    return this.forma.get('usaurio')?.invalid && this.forma.get('usaurio')?.touched
  }
  get distritoNoValido() {
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }

  get pass1NoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  crearFormulario() {

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]], //el primero es el valor por defecto; segundo validadores
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      usuario: ['', [Validators.required], this.validadores.existeUsuario],
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      direccion: this.fb.group({
        distrito: ['', [Validators.required, Validators.minLength(5)]],
        ciudad: ['', [Validators.required, Validators.minLength(3)]]

      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.camposIguales('pass1', 'pass2')
    });

  }
  crearListeners() {
    //cuando la forma surga cualquier cambios
    //me va avisar cualquier cambio de la forma de la forma 
    this.forma.valueChanges.subscribe(data => {
      //console.log(data)
    })

    //para cmabios en el estado del formulario
    this.forma.statusChanges.subscribe(data => {
      //console.log({data})
    })

    //para cambios en un campo ene spesifico
    this.forma.get('nombre').valueChanges.subscribe(data => {
      console.log(data)
      
    })
  }

  cargarData() {
  
    //para asignar valores de un servicio

    //reiniciar el formulario al cargar  
    this.forma.reset({
      nombre: 'alejandro',
      apellido: 'palomino',
      correo: 'apalomino12@icloud.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'ontario',
        ciudad: 'Otawa'
      }
    });
    //cargar la data al array
   // ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)))

  }
  setValue(arg0: { nombre: string; apellido: string; correo: string; direccion: { distrito: string; ciudad: string; }; }) {
    throw new Error('Method not implemented.');
  }
  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }
  borarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);

  }
  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAllAsTouched();

        }
        
      });
      return
    }

    //posteo de la informacion de
    this.forma.reset();
  }

}
