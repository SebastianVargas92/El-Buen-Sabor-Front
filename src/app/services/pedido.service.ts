import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url = 'http://localhost:9000/pedido';

  constructor(private http: HttpClient) { }

  setPedido(pedido) {
    return this.http.post(`${this.url}/agregar`, pedido);
  }

  getPedidos() {
    return this.http.get(`${this.url}/pedidos`);
  }

  getPedidoPag(page: number, size: number, asc: boolean, estado:number) {
    return this.http.get(`${this.url}/pages?page=${page}&size=${size}&asc=${asc}&estado=${estado}`);
  }

  getPedidoPagCyE(page: number, size: number, estado:number,correo: string) {
    return this.http.get(`${this.url}/pagesss?page=${page}&size=${size}&estado=${estado}&correo=${correo}`);
  }

  getPedido(numero){
    return this.http.get(`${this.url}/pedido/${numero}`);
  }

  enviarCorreo(correo){
    return  this.http.post('http://localhost:9000/email/send',correo);
  }

  verFactura(numero:number){
    //http://localhost:9000/pedido/pdfreport?numero=1593025239641
    return this.http.get(`${this.url}/pdfreport?numero=${numero}`);
  }

  masVendidas(fechas) {
    return this.http.post(`${this.url}/masvendidas`, fechas);
  }

  pedidosCliente(data) {
    return this.http.post(`${this.url}/pedidoscliente`, data);
  }
  pedidosClienteExcel(data) {
    return this.http.post(`${this.url}/pedidosclienteexcel`, data);
  }

  pedidoIngreso(fechas) {
    return this.http.post(`${this.url}/pedidoingresos`, fechas);
  }

}
