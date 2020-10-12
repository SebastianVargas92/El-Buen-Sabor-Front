import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:9000/v1';

  constructor(private http: HttpClient) { }


  actualizarUser(cliente){
    return this.http.put(`${this.url}/actualizar`, cliente);
  }

  getUser(correo:string){
    return this.http.get(`${this.url}/cliente/${correo}`);
  }


  registrarClienteGoogle(cliente){
    return this.http.post(`${this.url}/registrar`, cliente);
  }

  registrarClienteCorreo(cliente){
    return this.http.post( `${this.url}/agregar`, cliente);
  }

  getUsuarioPag(page:number,size:number){
    return this.http.get(`${this.url}/pages?page=${page}&size=${size}`);
  }

  getUsuarioPagR(page:number,size:number,order:string, asc:boolean, rol:number){
    return this.http.get(`${this.url}/pagess?page=${page}&size=${size}&order=${order}&asc=${asc}&rol=${rol}`);
  }

  addCocinero(){
    return this.http.get('http://localhost:9000/configuracion/configuracionn/unapersonamisteriosa1@gmail.com');
  }

 
  async registrarUsuario(cliente) {

    await this.registrarClienteGoogle(cliente).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  getClientes(rol){
    return this.http.post( `${this.url}/clienterol`, rol);
  }



}
