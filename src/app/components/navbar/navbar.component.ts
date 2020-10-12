import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;
  rol:string;

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { 
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onLogout() {
    this.authService.logoutUser();
    console.log('salir');
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if ( auth ) {
        this.isLogged = true;
        this. rolUser();
      } else {
        this.isLogged = false;
       }
    } );
  }

  rolUser(){
    setTimeout (() => {
      this.rol = localStorage.getItem('rol');
    console.log("El rol del usuario es : ", this.rol);
   }, 1000);
  }

 /*  getUser(){
    this.authService.isAuth().subscribe( user => {
      if ( user ) {
        console.log('email :', user.email);
        let completo = user.displayName.split(' ');
        let nombre = completo[0];
        let ape = completo[1];
        console.log('nombre: ', nombre);
        console.log('apellido: ', ape)
        console.log('numero :', user.phoneNumber);
        console.log('id :', user.uid);
        console.log('creado : ', user.metadata.creationTime);
        console.log('ultimo acceso : ', user.metadata.lastSignInTime);
      } else {
       }
    } );
  }
 */

}