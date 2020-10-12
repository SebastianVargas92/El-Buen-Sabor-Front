import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reventa',
  templateUrl: './reventa.component.html',
  styleUrls: ['./reventa.component.css']
})
export class ReventaComponent implements OnInit {

  @Input()
  items: any[] = [];
  carrito: any[];

  rol:string;

  constructor() { 
    this.rol = localStorage.getItem('rol');
  }

  ngOnInit(): void {
  }

  hayStock(i: number) {
    let o = this.items[i];
    if (o.stockActual -1 >= 0) {
      return true;
    } else { return false }

  }

  agregar(i: number) {
    console.log("El objeto a agregar es : ", this.items[i]);
    this.carrito = JSON.parse(localStorage.getItem("carro"));
    if (this.carrito == null) {
      this.carrito = [{
        articuloManufacturado: null,
        articuloReventa: null
      }];
      this.carrito[0].articuloReventa = this.items[i];
      this.carrito[0].cantidad = 1;

    } else {
      if (this.existe(this.items[i].id) == false) {

        let nuevo = {
          articuloReventa: null,
          articuloManufacturado: null,
          cantidad: null
        };
        nuevo.articuloReventa = this.items[i];
        nuevo.cantidad = 1;
        this.carrito.push(nuevo);

      }
    }
    localStorage.setItem("carro", JSON.stringify(this.carrito));
    console.log('El objeto agregado es : ', this.items[i]);
    console.log('El carrito actual es : ', this.carrito);
    alert('Se agrego al carrito');
  }

  existe(id) {
    for (let c of this.carrito) {
      if (c.articuloReventa != null) {
        if (c.articuloReventa.id == id) {
          c.cantidad++;
          return true;
        }
      }

    }
    return false;
  }
}
