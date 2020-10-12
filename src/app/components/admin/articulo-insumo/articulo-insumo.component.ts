import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RubroArticuloService } from '../../../services/rubro-articulo.service';
import { InsumoService } from '../../../services/insumo.service';
import { MedidaService } from '../../../services/medida.service';
import { Insumo } from 'src/app/modelo/insumo';

@Component({
  selector: 'app-articulo-insumo',
  templateUrl: './articulo-insumo.component.html',
  styleUrls: ['./articulo-insumo.component.css']
})
export class ArticuloInsumoComponent implements OnInit {

  articuloInsumo: Insumo = {
    denominacion: null,
    precioCompra: null,
    precioVenta: null,
    stockActual: null,
    stockMinimo: null,
    usuarioCarga: localStorage.getItem('email'),
    fechaAlta: Date.now(),
    unidadMedida: {
    },
    rubroArticulo: {
    }
  };

  medida = 0;

  uMedidas: any[] = [];
  /*  uMedidas = [
     {
       id: 1,
       denominacion: 'Litros'
     },
     {
       id: 2,
       denominacion: 'Mililitros'
     },
     {
       id: 3,
       denominacion: 'Kilos'
     },
     {
       id: 4,
       denominacion: 'Gramos'
     },
     {
       id: 5,
       denominacion: 'Unidad'
     }
   ]; */

  rubros: any[];

  insumos: [];

  totalPages: Array<number>;

  page = 0;
  size = 4;
  order = 'id';
  asc = true;

  isFirst = false;
  isLast = false;

  indice = 0;

  constructor(private rubroService: RubroArticuloService, private insumoServ: InsumoService, private medidaServ: MedidaService) {
    rubroService.getRubros().subscribe((data: any) => {
      this.rubros = data;
      console.log("La data desde data", data);
    }, error => console.log(error)
    );
    medidaServ.getMedidas().subscribe((data: any) => {
      this.uMedidas = data;
    }, error => console.log(error));

    this.getInsumosPag();
  }


  ngOnInit(): void {
  }

  buscar(termino: string) {
    if (termino.length > 0) {
      this.getInsumosPagB(termino);
    }else{
      this.getInsumosPag();
    }
  }

  getInsumos() {
    this.insumoServ.getInsumos().subscribe((data: any) => {
      this.insumos = data;
    }, error => console.log(error)
    );
  }

  getInsumosPag() {
    this.insumoServ.getInsumospag(this.page, this.size, this.order, this.asc).subscribe((data: any) => {
      console.log("data desde pageable ", data);
      this.insumos = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error)
    );

  }

  getInsumosPagB(termino: string) {
    this.insumoServ.getInsumospagBuscado(this.page, this.size, this.order, this.asc, termino).subscribe((data: any) => {
      console.log("data desde pageable ", data);
      this.insumos = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error)
    );

  }

  getMedidaXid(id: number) {
    for (let u of this.uMedidas) {
      if (u.id == id) {
        return u;
      }
    }
  }

  guardar(forma: NgForm) {
    this.articuloInsumo.rubroArticulo = this.getRubroxId(this.indice);
    this.articuloInsumo.unidadMedida = this.getMedidaXid(this.medida);
    /*  this.articuloInsumo.rubroArticulo = {
       id:21,
       denominacion:'Lacteos'
     } */
    console.log('forma ', forma);
    console.log('valor ', forma.value);
    console.log('El insumo es : ', this.articuloInsumo);

    this.insumoServ.setInsumo(this.articuloInsumo).subscribe((data: any) => {

      console.log('La respuesta del servidor', data);
      alert("Insumo guardado");
      forma.reset();
      this.indice = 0;
      this.medida = 0;
      this.articuloInsumo.unidadMedida = {};
      this.insumos = [];
      this.getInsumosPag();
    }, error => console.log(error)
    );
  }

  setInsumo(index: number) {
    this.articuloInsumo = this.insumos[index];
    console.log("El insumo desde actualizar es : ", this.articuloInsumo);
    this.indice = this.articuloInsumo.rubroArticulo.id;
    this.medida = this.articuloInsumo.unidadMedida.id;
    this.articuloInsumo.fechaModificacion = Date.now();
    this.articuloInsumo.usuarioModificacion = localStorage.getItem('email');

  }
  eliminar(index: number) {
    console.log("Se ejecuto eliminar con el index ", index);
    let eliminar = confirm('Se eliminara el articulo');

    if (eliminar) {

      this.articuloInsumo = this.insumos[index];
      this.articuloInsumo.fechaBaja = Date.now();
      this.articuloInsumo.usuarioBaja = localStorage.getItem('email');
      this.insumoServ.setInsumo(this.articuloInsumo).subscribe((data: any) => {

        console.log('La respuesta del servidor', data);
        alert("Insumo Eliminado");
        this.articuloInsumo.unidadMedida = 0;
        this.resetInsumo();
        this.insumos = [];
        this.getInsumosPag();
      }, error => console.log(error)
      );

    }

  }

  getRubroxId(id) {
    for (let rubro of this.rubros) {
      if (rubro.id == id) {
        return rubro;
      }
    }
  }

  resetInsumo() {
    this.indice = 0;
    this.medida = 0;
    this.articuloInsumo = {
      denominacion: null,
      precioCompra: null,
      precioVenta: null,
      stockActual: null,
      stockMinimo: null,
      unidadMedida: 0,
      fechaAlta: Date.now(),
      usuarioCarga: localStorage.getItem('email'),
      rubroArticulo: {
      }
    };
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.getInsumosPag();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.getInsumosPag();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.getInsumosPag();
  }

}
