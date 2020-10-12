import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../../../services/insumo.service';
import { ReventaService } from '../../../services/reventa.service';

@Component({
  selector: 'app-control-stock',
  templateUrl: './control-stock.component.html',
  styleUrls: ['./control-stock.component.css']
})
export class ControlStockComponent implements OnInit {

  insumos;
  
  reventas;

  constructor(private serInsu: InsumoService, private serRev: ReventaService) { 
    serInsu.getInsumosSin().subscribe((data : any) =>{
      this.insumos = data;
      console.log("La data es : ", data);
    },error =>console.log(error));

    serRev.getReventaSin().subscribe((data : any) =>{
      this.reventas = data;
      console.log("La data es : ", data);
    },error =>console.log(error));
  }

  ngOnInit(): void {
  }
  excel(){
    
    window.open(`http://localhost:9000/pedido/sinstockexcel`, "_blank");

  }

}
