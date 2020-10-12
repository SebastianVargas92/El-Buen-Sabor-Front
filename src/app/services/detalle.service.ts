import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  url = 'http://localhost:9000/detalle';

  constructor(private http: HttpClient) { }

  setDetalle(detalle) {
    return this.http.post(`${this.url}/agregar`, detalle);
  }

  getDetalles() {
    return this.http.get(`${this.url}/detalles`);
  }


}
