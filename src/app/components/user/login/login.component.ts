import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isError: boolean;
  msgError: string;

  user: any = {
    correo: '',
    nombre: '',
    apellido: '',
    telefono: '',
    rol:{
      id:''
    }
  };

  email: string = '';
  password: string = '';

  constructor( private router: Router, private serv: AuthService, private clienServ: ClienteService) { }

  onLogin() {
    this.serv.loginEmailUser(this.email, this.password).then((res: any) => {
      this.redireccion();
    }).catch(err => {
      console.log('err ', err.message);
      this.isError = true;
      this.msgError = err.message;
    });
  }

  onLoginGoogle() {
    this.serv.loginGoogle().then((res: any) => {
      this.redireccionGoogle();
    }).catch(err => {
      console.log('err ', err.message);
      this.isError = true;
      this.msgError = err.message;
    });
  }

  onLogout() {
    this.serv.logoutUser();
  }

 
  setActivo(){
    localStorage.setItem('loged', 'true');
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

  redireccion(){
    this.serv.isAuth().subscribe((user: any) => {
      if (user) {
        console.log("El user es : ", user);
        localStorage.setItem('email', user.email);
        this.clienServ.getUser(user.email).subscribe( (data: any) => {
          console.log(data);
           localStorage.setItem('rol', data.rol.descripcion);
           this.setActivo();
           if (user.emailVerified) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/user/verificacion']);
          }

        }, (errorService) =>{
        });
       
      }
    });

  }

}
