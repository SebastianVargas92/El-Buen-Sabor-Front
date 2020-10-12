import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {
  
  public correo;

  constructor( private serv: AuthService) { }

  ngOnInit(): void {
  
   this.serv.isAuth().subscribe( user => {
    if ( user ) {
      console.log('email :', user.email);

      this.correo = user.email;
      
    } else {
     }
  } );
   console.log("El usuario es : " +  this.correo);
  }

  verificacion(){
    this.serv.emailVerificacion();
  }

}
