import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  url = 'http://localhost:9000/insumo';

  constructor(private http: HttpClient) { }

  setInsumo(insumo){
    return this.http.post(`${this.url}/agregar`,insumo);
  }

  
  getInsumos(){
    return this.http.get(`${this.url}/insumos`);
  }

  getInsumosSin(){
    return this.http.get(`${this.url}/sinstock`);
  }

  getInsumospag(page:number,size:number,order: string,asc: boolean){
    return this.http.get(`${this.url}/pages?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  getInsumospagBuscado(page:number,size:number,order: string,asc: boolean,buscado: string){
    return this.http.get(`${this.url}/pagess?page=${page}&size=${size}&order=${order}&asc=${asc}&buscado=${buscado}`);
  }
}
