import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReventaService {

  url = 'http://localhost:9000/reventa';

  constructor(private http: HttpClient) { }

  setReventa(data) {
    return this.http.post(`${this.url}/nuevo`, data);
  }

  updateImage(data) {
    return this.http.put(`${this.url}/image`, data);
  }

  updateReventa(reventa) {
    return this.http.put(`${this.url}/actualizar`, reventa);
  }
  getReventa() {
    return this.http.get(`${this.url}/listar`);
  }

  getReventaPag(page: number, size: number, order: string, asc: boolean) {
    return this.http.get(`${this.url}/pages?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  getReventaPagB(page: number, size: number, order: string, asc: boolean, termino:string) {
    return this.http.get(`${this.url}/pagesss?page=${page}&size=${size}&order=${order}&asc=${asc}&termino=${termino}`);
  }
  
  getReventaPagR(page: number, size: number,rubro:number) {
    return this.http.get(`${this.url}/pagess?page=${page}&size=${size}&rubro=${rubro}`);
  }
  getReventaR(rubro:number) {
    return this.http.get(`${this.url}/listarr?rubro=${rubro}`);
  }
  getReventaSin(){
    return this.http.get(`${this.url}/sinstock`);
  }
}
