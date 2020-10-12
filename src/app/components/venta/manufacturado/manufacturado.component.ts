import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manufacturado',
  templateUrl: './manufacturado.component.html',
  styleUrls: ['./manufacturado.component.css']
})
export class ManufacturadoComponent implements OnInit {

  @Input()
  items: any[] = [];
  carrito: any[];
  rol:string;

  detalle:any= {
    denominacion:"",
    manufacturadoDetalle:null

  };

  constructor() {
    this.rol = localStorage.getItem('rol');
   }

  ngOnInit(): void {
   
  }

 /*  hayStock(i: number) {

    let m = this.items[i];
    console.log("El item es : ", m);
    let c = 0;
    for (let a of m.manufacturadoDetalle) {
      console.log("El m Es : ", a.articuloInsumo);
      if (a.articuloInsumo.stockActual > a.articuloInsumo.stockMinimo) {
        c++;

      }
    }
    console.log("El size es : ", m.manufacturadoDetalle.length);
    console.log("El c es : ", c);
    if (c == m.manufacturadoDetalle.length) {
      return true;
    }
    else {
      return false;
    }
    //  return true;

  } */

  hayStock(i: number) {
    let m = this.items[i];
    console.log("El item es : ", m);
    let c = 0;
    for (let a of m.manufacturadoDetalle) {
      console.log("El m Es : ", a.articuloInsumo);

     /*  if(a.articuloInsumo.unidadMedida.id == a.unidadMedida.id){
        if ( a.articuloInsumo.stockActual -a.cantidad >= 0 ) {
          c++;
        }
      }else if(a.articuloInsumo.unidadMedida.id == 2 && a.unidadMedida.id == 1 ){
        if ( a.articuloInsumo.stockActual - (a.cantidad/1000) >= 0 ) {
          c++;
        }
      }else if( a.articuloInsumo.unidadMedida.id == 3 && a.unidadMedida.id == 4  ){
        if ( a.articuloInsumo.stockActual - (a.cantidad/1000) >= 0 ) {
          c++;
        }
      } */

      if( a.articuloInsumo.stockActual -a.cantidad >= 0 ){
        c++;
      }
    }
    console.log("El size es : ", m.manufacturadoDetalle.length);
    console.log("El c es : ", c);
    if (c == m.manufacturadoDetalle.length) {
      return true;
    }
    else {
      return false;
    }
    //  return true;

  }

  agregar(i: number) {
    if (this.hayStock(i)) {
      this.carrito = JSON.parse(localStorage.getItem("carro"));
      if (this.carrito == null) {
        this.carrito = [{
          articuloManufacturado: null,
          articuloReventa: null
        }];
        this.carrito[0].articuloManufacturado = this.items[i];
        this.carrito[0].cantidad = 1;

      } else {
        if (this.existe(this.items[i].id) == false) {

          let nuevo = {
            articuloManufacturado: null,
            articuloReventa: null,
            cantidad: null
          };
          nuevo.articuloManufacturado = this.items[i];
          nuevo.cantidad = 1;
          this.carrito.push(nuevo);

        }
      }
      localStorage.setItem("carro", JSON.stringify(this.carrito));
      console.log('El objeto agregado es : ', this.items[i]);
      console.log('El carrito actual es : ', this.carrito);

      alert('Se agrego al carrito');
    } else {
      alert("No hay stock");
    }
  }

  existe(id) {
    for (let c of this.carrito) {
      if (c.articuloManufacturado != null) {
        if (c.articuloManufacturado.id == id) {
          c.cantidad++;
          return true;
        }
      }

    }
    return false;
  }

  setDetalle(i){
    this.detalle = this.items[i];
  }

}
