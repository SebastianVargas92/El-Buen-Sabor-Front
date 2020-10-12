import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { PedidoService } from '../../../services/pedido.service';
import { DetalleService } from '../../../services/detalle.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido: any = {
    fecha: null,
    numero: Date.now(),
    estado: 1,
    horaEstimadaFin: null,
    tipoEnvio: '1',
    cliente: {
    },
    factura: null
  };

  numeroPedido = 0;

  carrito: any[];

  total: number;

  constructor(private clientServ: ClienteService, private pedidoServ: PedidoService, private detalleServ: DetalleService) {
    this.carrito = JSON.parse(localStorage.getItem("carro"));
    if (this.carrito == null) {
      this.carrito = [];
    }
  }

  ngOnInit(): void {
    this.obtener(localStorage.getItem('email'));
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = 0;

    for (let c of this.carrito) {

      //c.factura = null;

      //  if(c.articuloManufacturado =! null){
      if (c.articuloReventa == null) {
        c.subtotal = c.articuloManufacturado.precioVenta * c.cantidad;
        this.total += c.articuloManufacturado.precioVenta * c.cantidad;
      } else {
        c.subtotal = c.articuloReventa.precioVenta * c.cantidad;
        this.total += c.articuloReventa.precioVenta * c.cantidad;
      }

      //  }else{
      /*  c.subtotal = c.articuloReventa.precioVenta * c.cantidad;
       this.total += c.articuloReventa.precioVenta * c.cantidad; */
      // }

    }

    if (this.pedido.tipoEnvio == 1) {
      this.total = this.total * 0.9;
    }
  }

  eliminar(i) {
    let eliminar = confirm('Se eliminara el articulo');
    if (eliminar) {
      this.carrito.splice(i, 1);
      localStorage.setItem("carro", JSON.stringify(this.carrito));
      this.calcularTotal();
    }


  }

  incrementa(i) {
    this.carrito[i].cantidad++;
    localStorage.setItem("carro", JSON.stringify(this.carrito));
    this.calcularTotal();
  }

  decrementa(i) {
    this.carrito[i].cantidad--;
    localStorage.setItem("carro", JSON.stringify(this.carrito));
    this.calcularTotal();
  }

  obtener(correo: string) {
    this.clientServ.getUser(correo).subscribe((data: any) => {
      console.log(data);
      this.pedido.cliente = data;
    }, (errorService) => {
    });

  }

  confirmarPedido() {

    if(this.hayStock()){

    this.pedido.detallePedido = this.carrito;
    console.log('El pedido es : ', this.pedido);

    console.log('El carrito es : ', this.carrito);
    this.numeroPedido = this.pedido.numero;

    this.pedidoServ.setPedido(this.pedido).subscribe((res: any) => {
      alert("Se realizo el pedido");
      this.limpiar();
    }, error => console.log(error));
    console.log("El numero de pedido es : ", this.numeroPedido);
  }else{
    alert("No hay stock suficiente para realizar el pedido.");
  }

  }

  limpiar() {
    // this.carrito = null;
    this.carrito = [];
    localStorage.setItem("carro", JSON.stringify(this.carrito));
    this.total = 0;

  }

  vacio() {
    if (this.carrito[0] == null) {
      return true;
    } else {
      false;
    }
  }

  hayStock() {
    let cantManu =0;
    let stockManu =0;
    let cantReven =0;
    let stockReven =0;
    for (let c of this.carrito) {
      if (c.articuloReventa == null) {
        cantManu++;
        let cont = 0;
        for (let manuDet of c.articuloManufacturado.manufacturadoDetalle) {

    /*       if (manuDet.articuloInsumo.unidadMedida.id == manuDet.unidadMedida.id) {
            if (manuDet.articuloInsumo.stockActual - (manuDet.cantidad * c.cantidad) >= 0) {
              cont++;
            }
          } else if (manuDet.articuloInsumo.unidadMedida.id == 2 && manuDet.unidadMedida.id == 1) {
            console.log("Entro a kilos y gramos");
            if (manuDet.articuloInsumo.stockActual - ((manuDet.cantidad / 1000) * c.cantidad) >= 0) {
              console.log("Entro a  cont mas mas");
              cont++;
            }
          } else if (manuDet.articuloInsumo.unidadMedida.id == 3 && manuDet.unidadMedida.id == 4) {
            if (manuDet.articuloInsumo.stockActual - ((manuDet.cantidad / 1000) * c.cantidad) >= 0) {
              cont++;
            }

          } */
          if(manuDet.articuloInsumo.stockActual - (manuDet.cantidad * c.cantidad) >= 0){
            cont++;
          }
        }
        if(cont == c.articuloManufacturado.manufacturadoDetalle.length){
          stockManu++;
        }
      }else{
        cantReven++;
        if(c.articuloReventa.stockActual - c.cantidad >=0 ){
          stockReven++;

        }
      }
    }
      if(cantManu == stockManu && cantReven == stockReven){
        return true;
      }else{
        return false;
      }
  }
}
