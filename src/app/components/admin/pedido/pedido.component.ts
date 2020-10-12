import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ReventaService } from 'src/app/services/reventa.service';
import { InsumoService } from '../../../services/insumo.service';
import { Pedido } from '../../../modelo/pedido';
import { Factura } from '../../../modelo/factura';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedidos: Pedido[];

  factura: Factura = {
    fecha: Date.now(),
    numero: Date.now(),
    total: 0,
    montoDescuento: 0,
    formaPago: 0,
    nroTarjeta: 0
  };

  pedido;
  rol;
  correo;

  totalPages: Array<number>;

  page = 0;
  size = 4;
  estado = 1;
  isFirst = false;
  isLast = false;
  asc = false;

  constructor(private pedidoServ: PedidoService, private servRev: ReventaService, private insumoServ: InsumoService) {
    this.getPedidosPag();
  }
  getPedidosPag() {
    this.rol = localStorage.getItem('rol');
    let correo = localStorage.getItem('email');

    if (this.rol == 'cliente') {
      console.log('El correo es : ', this.correo);
      console.log('Entro en rol de cliente');
      this.pedidoServ.getPedidoPagCyE(this.page, this.size, this.estado, correo).subscribe((data: any) => {
        this.pedidos = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data.totalPages);
        console.log("Los pedidos son ", data.content);
      }, error => console.log(error));

    } else {
      if (this.rol == 'cocinero') {
        this.estado = 2;
      }
      console.log("El estado es : ", this.estado);
      this.pedidoServ.getPedidoPag(this.page, this.size, this.asc, this.estado).subscribe((data: any) => {
        this.pedidos = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data.totalPages);
        console.log("Los pedidos son ", data.content);
      }, error => console.log(error));
    }
  }

  ngOnInit(): void {
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.getPedidosPag();
    }
  }
  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.getPedidosPag();
    }
  }
  setPage(page: number): void {
    this.page = page;
    this.getPedidosPag();
  }

  confirmar(i: number) {
    console.log("El pedido a confirmar es : ", this.pedidos[i]);
    this.pedido = this.pedidos[i];
    this.pedido.estado = 2;
    this.pedidoServ.setPedido(this.pedido).subscribe((data: any) => {
      console.log("Respuesta al insertar ", data);
      this.getPedidosPag();
      alert('Se confirmo el pedido');

    }, error => console.log(error));

  }
  cancelar(i: number) {
    console.log("El pedido a confirmar es : ", this.pedidos[i]);
    this.pedido = this.pedidos[i];
    this.pedido.estado = 0;
    this.pedidoServ.setPedido(this.pedido).subscribe((data: any) => {

      console.log("Respuesta al insertar ", data);
      this.getPedidosPag();
      alert('Se elimino el pedido');

    }, error => console.log(error));

  }

  controlStock(i: number) {
    let p = this.pedidos[i];
    for (let a of p.detallePedido) {
      if (a.articuloManufacturado == null) {
        a.articuloReventa.stockActual -= a.cantidad;
        console.log("Se decremento el stock");
        console.log("El reventa a actualizar es : ", a.articuloReventa);
        this.servRev.updateReventa(a.articuloReventa).subscribe((data: any) => {
          console.log(data);
        }, error => console.log(error));
      } else {
        console.log("El articulo es : ", a.articuloManufacturado);

        for (let m of a.articuloManufacturado.manufacturadoDetalle) {
          m.articuloInsumo.stockActual -= (m.cantidad * a.cantidad);
          /*  if(m.articuloInsumo.unidadMedida.id == m.unidadMedida.id){
             m.articuloInsumo.stockActual -= (m.cantidad * a.cantidad);
           }else if(m.articuloInsumo.unidadMedida.id == 2 && m.unidadMedida.id == 1 ){
             m.articuloInsumo.stockActual -= ((m.cantidad/1000) * a.cantidad);
           }else if( m.articuloInsumo.unidadMedida.id == 3 && m.unidadMedida.id == 4  ){
             m.articuloInsumo.stockActual -= ((m.cantidad/1000) * a.cantidad);
           } */
          this.insumoServ.setInsumo(m.articuloInsumo).subscribe((data: any) => {
            console.log('La respuesta del servidor', data);
          }, error => console.log(error)
          );
        }
      }
    }
    this.pedidos[i] = p;
  }


  actualizaEstado(i: number, est: number) {
    console.log("El pedido a confirmar es : ", this.pedidos[i]);
    if (est == 3) {
      this.controlStock(i);
    }
    this.pedido = this.pedidos[i];
    this.pedido.estado = est;
    this.pedidoServ.setPedido(this.pedido).subscribe((data: any) => {
      console.log("Respuesta al insertar ", data);
      this.getPedidosPag();
      if (est == 2) {
        if (this.pedido.horaEstimadaFin == null) {
          alert('Se confirmo el pedido');
        } else {
          alert('Se demoro el pedido');
        }
      } else if (est == 0) {
        alert('Se elimino el pedido');
      } else if (est == 4) {
        alert('Se envio el pedido');
      } else if (est == 3) {
        alert('Pedido realizado');
      }
    }, error => console.log(error));
  }

  setPedido(i) {
    this.pedido = this.pedidos[i];
    this.calcularTotal();
    if (this.pedido.tipoEnvio == 1) {
      this.factura.montoDescuento = this.factura.total * 0.1;
      this.factura.total = this.factura.total - this.factura.montoDescuento;
    }
    console.log('El pedido es ', this.pedido);
  }


  facturar(forma) {

    let c = {
      email: this.pedido.cliente.correo,
      subject: "Factura El Buen Sabor.",
      content: "Podes ver y descargar tu factura desde : "
        + `http://localhost:9000/pedido/pdfreport?numero=${this.pedido.numero}`
    }
    this.pedido.estado = 5;
    this.pedido.factura = this.factura;
    console.log("El pedido es : ", this.pedido);
    console.log("La factura es :", this.factura);
    this.pedidoServ.setPedido(this.pedido).subscribe((data: any) => {

      this.pedidoServ.enviarCorreo(c).subscribe((data: any) => {
        console.log("Envio de correo", data);
      }, error => console.log(error));

      console.log("Respuesta al insertar ", data);
      this.getPedidosPag();

      alert("Se Facturo el pedido");

    }, error => console.log(error));

  }
  calcularTotal() {
    this.factura.total = 0;
    for (let d of this.pedido.detallePedido) {
      this.factura.total += d.subtotal;
    }
  }

  verFactura(i) {
    this.pedido = this.pedidos[i];
    console.log("El pedido es : ", this.pedido);
    window.open(`http://localhost:9000/pedido/pdfreport?numero=${this.pedido.numero}`, "_blank");
    /*  this.pedidoServ.getPedido(this.pedido.numero).subscribe((data:any)=>{
       console.log("data de la factura", data);
     }, error => console.log(error)); */

    /*  console.log("Hola hiciste click");
     const pdf = new PdfMakeWrapper();
     // pdf.header('Factura');
     pdf.info({
       title: 'Factura',
       author: 'Lautaro Escudero',
       subject: 'Factura generada',
     });
     pdf.add(
       new Txt("Factura Generada").bold().fontSize(20).end
     );
 
     pdf.create().open(); */
  }

}
