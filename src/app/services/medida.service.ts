import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {
  url = 'http://localhost:9000/medida';

  constructor(private http: HttpClient) { }

  setMedida(localidad){
    return this.http.post( `${this.url}/agregar`, localidad);
  }
  getMedidas() {
    return this.http.get(`${this.url}/listar`);
  }
}
