import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { LocalidadService } from '../../../services/localidad.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  isError: boolean;
  msgError: string;
  usuario:any = {
    nombre:'',
    apellido:'',
    telefono:'',
    correo: '',
    rol:{
      id:0
    },
    domicilio:{
      localidad:0

    }

  };

  localidades:any[];
  indice =0;

  roles=[
    {id:2,
    denominacion:"cocinero"},
    {id:3,
      denominacion:"admin"},
    {id:4,
      denominacion:"cajero"}
  ]

  password;

  usuarios: any [];

  totalPages: Array<number>;

  rol= 0;

  page = 0;
  size = 4;
  order = 'id';
  asc = true;
  isFirst = false;
  isLast = false;

  constructor(private userServ: ClienteService, private locaServ : LocalidadService,private serv: AuthService) {
    this.getUsuariosPag();
    locaServ.getLocalidades().subscribe((data:any) =>{
      this.localidades = data;
    }, error => console.log(error));

    console.log("Los roles son : ", this.roles);

   }

  ngOnInit(): void {
  }
 
  onRegister() {
    this.serv.registerUser(this.usuario.correo, this.password).then((res) => {
      alert("Se registro al usuario");
      this.userServ.registrarUsuario(this.usuario);
      if(this.usuario.rol.id == 2){
        this.userServ.addCocinero().subscribe((data:any) =>{
          console.log("Data del servidor cocinero : ", data);
        });
      }
    }).catch(err => { 
      console.log('err ', err.message);
      this.isError = true;
       this.msgError = err.message; } );
  }


  guardar(forma: NgForm) {

    this.usuario.domicilio.localidad = this.getLocalidadxId(this.indice);
    this.usuario.rol = this.getRolxId(this.usuario.rol.id);

    console.log("El usuario es :" , this.usuario);

    this.onRegister();
    
 
  }

   getUsuariosPag() {

    this.userServ.getUsuarioPagR(this.page,this.size, this.order, this.asc, this.rol).subscribe((data:any) => {
      console.log("La data es : ,", data);
      this.usuarios = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error));
  }

  getLocalidadxId(id){
    for(let l of this.localidades){
      if(l.id == id){
        return l;
      }
    }
  }
  getRolxId(id){
    for(let l of this.roles){
      if(l.id == id){
        return l;
      }
    }
  }

  actualizar(){
    this.userServ.actualizarUser(this.usuario).subscribe((data: any) => {

      console.log('Datos actualizados', data);
      alert("Datos actualizados");

    }, error => console.log(error)
    );
  }


  setUsuario(i){
    this.usuario = this.usuarios[i];
    this.indice = this.usuarios[i].domicilio.localidad.id;

  }
 
  resetUsuario(){

    this.usuario  = {
      nombre:'',
      apellido:'',
      telefono:'',
      correo: '',
      rol:{
        id:0
      },
      domicilio:{
        localidad:0,
        numero:null
  
      }
  }
  this.indice =0;
  this.password = null;
}

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.getUsuariosPag();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.getUsuariosPag();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.getUsuariosPag();
  }

}