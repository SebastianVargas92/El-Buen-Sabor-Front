import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isError: boolean;
  msgError: string;
  user: any = {
    correo:  '',
    nombre: '',
    apellido: '',
    telefono: '',
    rol: {
      id:''
    }
  };

  password: string = '';

  constructor(private serv: AuthService, private router: Router, private clienServ: ClienteService) { }

  onRegister() {
    this.serv.registerUser(this.user.correo, this.password).then((res) => {
      this.redirecion();
    }).catch(err => { 
      console.log('err ', err.message);
      this.isError = true;
       this.msgError = err.message; } );
  }

  onLoginGoogle() {
    this.serv.loginGoogle().then( (res : any) => {
     this.redireccionGoogle();
    } ).catch ( err => { 
      console.log('err ', err.message);
      this.isError = true;
       this.msgError = err.message; } );
  }

  setActivo(){
    localStorage.setItem('loged', 'true');
  }

  redirecion(){
    this.user.rol.id = 1;
    this.clienServ.registrarUsuario(this.user); 
    localStorage.setItem('rol', 'cliente');
    this.setActivo();
    localStorage.setItem('email', this.user.correo);
    this.router.navigate(['/user/verificacion']);
  }

  redireccionGoogle(){
    this.serv.isAuth().subscribe((user: any) => {
      if (user) {
        console.log("Datos del usuario desde el login con google", user);
        let completo = user.displayName.split(' ');
        this.user.nombre = completo[0];
        this.user.apellido = completo[1];
        this.user.correo = user.email;
        this.user.rol.id = 1;
        if (user.phoneNumber !== null) {
          this.user.telefono = user.phoneNumber;
        }
         this.clienServ.registrarUsuario(this.user); 
         localStorage.setItem('email', this.user.correo);
         localStorage.setItem('rol', 'cliente');
         this.setActivo();
         this.router.navigate(['/home']);
      }
    });
  }

}
