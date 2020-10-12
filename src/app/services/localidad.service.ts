import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  url = 'http://localhost:9000/localidad';

  constructor(private http: HttpClient) { }


  setLocalidad(localidad){
    return this.http.post( `${this.url}/agregar`, localidad);
  }
  getLocalidades() {
    return this.http.get(`${this.url}/listar`);
  }


}
