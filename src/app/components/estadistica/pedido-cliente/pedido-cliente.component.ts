import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.component.html',
  styleUrls: ['./pedido-cliente.component.css']
})
export class PedidoClienteComponent implements OnInit {

  fechas = {
    desde: null,
    hasta: null
  }

  cliente:any={
    id:0
  };

  clientes: any[];

  pedidos: any[];

  constructor(private clienteServ : ClienteService, private pedidoServ: PedidoService ) {
    const rol= {
      id:1,
      descripcion:'cliente'
    }
    clienteServ.getClientes(rol).subscribe((data:any) =>{
      this.clientes = data;
    },error => console.log(error));
   }

   clienteXID(id){
     for(let c of this.clientes){
      if(c.id == id){
        return c;
      }
     }
   }

  ngOnInit(): void {
  }

  guardar(forma){

    this.pedidos = null;
    this.cliente = this.clienteXID(this.cliente.id);
    console.log("El cliente es : ", this.cliente);

    console.log("Las fechas son : ", this.fechas);

    const data = new FormData();
    data.append('desde', this.fechas.desde);
    data.append('hasta', this.fechas.hasta);
    data.append('correo', this.cliente.correo);

    this.pedidoServ.pedidosCliente(data).subscribe((data:any) =>{
      this.pedidos = data;
      console.log("Los pedidos son : ", data);
    },error =>console.log(error));

  }

  excel(){
    
    window.open(`http://localhost:9000/pedido/pedidosclienteexcel?desde=
    ${this.fechas.desde}&hasta=${this.fechas.hasta}&correo=${this.cliente.correo}`, "_blank");

  }

}
