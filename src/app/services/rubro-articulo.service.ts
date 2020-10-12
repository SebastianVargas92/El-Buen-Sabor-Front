import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RubroArticuloService {

  url = 'http://localhost:9000/rubroarticulo';

  constructor(private http: HttpClient) { }


  getRubros(){
    return this.http.get(`${this.url}/rubros`);
  }

  setRubro(articulo){
    return this.http.post(`${this.url}/agregar`,articulo);
  }

  geRubArtPag(page:number,size:number){
    return this.http.get(`${this.url}/pages?page=${page}&size=${size}`);
  }
  
  geRubrosR(rubro:number){
    return this.http.get(`${this.url}/rubross?id=${rubro}`);
  } 
}