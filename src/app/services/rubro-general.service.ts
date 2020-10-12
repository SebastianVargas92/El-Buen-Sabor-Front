import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RubroGeneralService {

  url = 'http://localhost:9000/rubro';

  constructor(private http: HttpClient) { }


  getRubros(){
    return this.http.get(`${this.url}/rubros`);
  }

  setRubro(rubro){
    return this.http.post(`${this.url}/agregar`,rubro);
  }

  geRubArtPag(page:number,size:number){
    return this.http.get(`${this.url}/pages?page=${page}&size=${size}`);
  }
}
