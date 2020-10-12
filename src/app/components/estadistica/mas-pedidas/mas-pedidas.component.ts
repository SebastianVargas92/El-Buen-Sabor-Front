import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-mas-pedidas',
  templateUrl: './mas-pedidas.component.html',
  styleUrls: ['./mas-pedidas.component.css']
})
export class MasPedidasComponent implements OnInit {

  fechas = {
    desde: null,
    hasta: null
  }

  masVendidas: any[];

  constructor(private servicio: PedidoService) {
  }

  ngOnInit(): void {
  }

  guardar(forma) {

    this.masVendidas = null;
    console.log("La forma es : ", forma);
    console.log("Las fechas son ", this.fechas);
    const data = new FormData();
    data.append('desde', this.fechas.desde);
    data.append('hasta', this.fechas.hasta);
    this.servicio.masVendidas(data).subscribe((data: any) => {
      this.masVendidas = data;
      console.log("La data es : ", data);
    }, error => console.log(error));

  }

  excel(){
    window.open(`http://localhost:9000/pedido/maspedidasexcel?desde=
    ${this.fechas.desde}&hasta=${this.fechas.hasta}`, "_blank");
  }
}
