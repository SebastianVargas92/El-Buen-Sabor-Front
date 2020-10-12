import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  constructor(private serv: AuthService) {
   }

  email: string;
  isError: boolean;
  msgError: string;
  enviado: boolean;

  ngOnInit(): void {
  }

  resetPass() {
    this.serv.recuperaPass(this.email).then( (res) => {

      console.log('resUser: ', res);
     // this.router.navigate(['admin/list']);
     this.enviado = true;

     } ).catch(err => { 
      console.log('err ', err.message);
     // console.log(err);
      this.enviado = false;
       this.msgError = err.message; } );

  }

}
