import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  total : number =0;

  fechas = {
    desde: null,
    hasta: null
  }

  pedidos:any[];

  constructor(private pedidoServ: PedidoService) { }

  ngOnInit(): void {
  }

  guardar(forma){

    const data = new FormData();
    data.append('desde', this.fechas.desde);
    data.append('hasta', this.fechas.hasta);

    this.pedidoServ.pedidoIngreso(data).subscribe((data:any) =>{

      this.pedidos= data;
      console.log("La data es : ", data);
      this.calcularTotal();

    },error =>console.log(error));

  }

  excel(){
    
    window.open(`http://localhost:9000/pedido/ingresosExcel?desde=
    ${this.fechas.desde}&hasta=${this.fechas.hasta}`, "_blank");

  }

  calcularTotal(){
    this.total =0;
    for(let p of this.pedidos){
     this.total += p.factura.total;
    }
  }

}
