import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { AuthService } from '../../../services/auth.service';
import { LocalidadService } from '../../../services/localidad.service';
import { Domicilio } from '../../../modelo/domicilio';
import { Usuario } from 'src/app/modelo/usuario';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  forma: any;
  user: Usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    rol: {
      id: ''
    }
  };
  domicilio: Domicilio = {
    localidad: {
      id: 0
    },
    calle: '',
    numero: null
  }

  localidades: any[];

  constructor(private servClient: ClienteService, private serv: AuthService, private locaServ: LocalidadService) {
    this.obtener(localStorage.getItem('email'));

    locaServ.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      console.log("Data ", data);
      console.log("Localidades ", this.localidades);
    }, error => console.log(error));

  }

  ngOnInit(): void {

    console.log("Las localidades son : ", this.localidades);
  }

  guardarCambios() {

    console.log('Los datos del formulario son ', this.forma.value);

    let guardar: any =
    {
      id: this.user.id,
      nombre: this.forma.value.nombre,
      apellido: this.forma.value.apellido,
      correo: this.forma.value.correo,
      telefono: this.forma.value.telefono,
      rol: {
        id: this.user.rol.id
      },
      domicilio: {
        calle: this.forma.value.domicilio.calle,
        numero: this.forma.value.domicilio.numero,
        localidad: this.getLocalidadxId(this.forma.value.domicilio.localidad),
        id: null
      }
    }

    if (this.user.domicilio.id !== null) {
      guardar.domicilio.id = this.user.domicilio.id;

      console.log('El objeto guardar con id es ', guardar);
    }
    this.servClient.actualizarUser(guardar).subscribe((data: any) => {

      console.log('Datos actualizados', data);
      alert("Datos actualizados");

    }, error => console.log(error)
    );

  }

  obtener(correo: string) {
    this.servClient.getUser(correo).subscribe((data: any) => {
      console.log(data);
      this.user = data;
      if (data.domicilio === null) {
        this.user.domicilio = this.domicilio;
      }
      this.creaForm();

    }, (errorService) => {
    });

  }

  creaForm() {
    this.forma = new FormGroup({
      nombre: new FormControl(this.user.nombre, [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl(this.user.apellido, [Validators.required, Validators.minLength(3)]),
      correo: new FormControl(this.user.correo, [Validators.required, Validators.minLength(5)]),
      telefono: new FormControl(this.user.telefono, [Validators.required, Validators.minLength(5)]),
      domicilio: new FormGroup({
        localidad: new FormControl(this.user.domicilio.localidad.id, [Validators.required]),
        calle: new FormControl(this.user.domicilio.calle, [Validators.required, Validators.minLength(5)]),
        numero: new FormControl(this.user.domicilio.numero, [Validators.required, Validators.minLength(5)])
      })
    })
  }

  getLocalidadxId(id) {

    for (let l of this.localidades) {
      if (l.id == id) {
        return l;
      }
    }

  }

}
