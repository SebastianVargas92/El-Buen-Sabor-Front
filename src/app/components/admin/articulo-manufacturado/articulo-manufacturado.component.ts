import { Component, OnInit } from '@angular/core';
import { NgForm, FormArray } from '@angular/forms';
import { ReventaService } from '../../../services/reventa.service';
import { RubroGeneralService } from '../../../services/rubro-general.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsumoService } from '../../../services/insumo.service';
import { ManufacturadoService } from '../../../services/manufacturado.service';
import { MedidaService } from '../../../services/medida.service';
import { Insumo } from '../../../modelo/insumo';

@Component({
  selector: 'app-articulo-manufacturado',
  templateUrl: './articulo-manufacturado.component.html',
  styleUrls: ['./articulo-manufacturado.component.css']
})
export class ArticuloManufacturadoComponent implements OnInit {

  articuloManufacturado: any = {
    denominacion: null,
    precioVenta: null,
    tiempoEstimadoCocina: null,
    usuarioCarga: localStorage.getItem('email'),
    fechaAlta: Date.now(),
    rubro: {
    },
    manufacturadoDetalle: [
      {
        unidadMedida: {
          id: 1,
        },
        denominacion: '',
        cantidad: null,
        articuloInsumo: {
          id: 0
        }
      }
    ]
  };

  uMedidas: any[] = [] /* [
    {
      cod: 1,
      denominacion: 'Litros'
    },
    {
      cod: 2,
      denominacion: 'Mililitros'
    },
    {
      cod: 3,
      denominacion: 'Kilos'
    },
    {
      cod: 4,
      denominacion: 'Gramos'
    },
    {
      cod: 5,
      denominacion: 'Unidad'
    }
  ];
 */
  rubros: any[];
  insumos: any[];

  rubro = 0;

  manufacturados: any[];

  totalPages: Array<number>;

  page = 0;
  size = 4;
  order = 'id';
  asc = true;

  isFirst = false;
  isLast = false;

  indice = 0;

  file;

  photoSelected: string | ArrayBuffer;

  constructor(private rubroService: RubroGeneralService, private manufacturadoServ: ManufacturadoService, private insuSer: InsumoService,
    private medidaServ: MedidaService) {
    rubroService.getRubros().subscribe((data: any) => {
      this.rubros = data;
      console.log("La data desde data", data);
    }, error => console.log(error)
    );

    insuSer.getInsumos().subscribe((data: any) => {
      this.insumos = data;
      console.log("La data desde data", data);
    }, error => console.log(error)
    );
    medidaServ.getMedidas().subscribe((data: any) => {
      this.uMedidas = data;
    }, error => console.log(error));

    this.getManufacturadoPag();
  }

  addDetalle() {
    this.articuloManufacturado.manufacturadoDetalle[this.articuloManufacturado.manufacturadoDetalle.length] = {
      unidadMedida: {
        id: 1
      },
      cantidad: null,
      denominacion: '',
      articuloInsumo: {
        id: 0
      }
    };
  }

  deleteDetalle() {
    if (this.articuloManufacturado.manufacturadoDetalle.length == 1) {
      alert("Por lo menos debe haber un detalle");
    } else {
      let eliminar = confirm('Desea eliminar el detalle');
      if (eliminar) {
        this.articuloManufacturado.manufacturadoDetalle.splice(this.articuloManufacturado.manufacturadoDetalle.length - 1, 1);
      }
    }
  }

  ngOnInit(): void {
  }

  buscar(termino: string) {

    if (termino.length > 0) {
      this.getManufacturadoPagB(termino);
    } else {
      this.getManufacturadoPag();
    }

  }

  getManufacturado() {
    this.manufacturadoServ.getManufacturado().subscribe((data: any) => {
      this.manufacturados = data;
    }, error => console.log(error)
    );

  }

  getManufacturadoPag() {
    this.manufacturadoServ.getManufacturadoPagR(this.page, this.size,this.order,this.asc, this.rubro).subscribe((data: any) => {
      console.log("data desde pageable ", data);
      this.manufacturados = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error)
    );

    setTimeout(() => {
      this.addDescrip();
    }, 500);
  }

  getManufacturadoPagB(termino: string) {
    this.manufacturadoServ.getManufacturadoPagRB(this.page, this.size,this.order,this.asc, this.rubro, termino).subscribe((data: any) => {
      this.manufacturados = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error));
    setTimeout(() => {
      this.addDescrip();
    }, 500);
  }

  addDescrip() {
    for (let m of this.manufacturados) {
      for (let d of m.manufacturadoDetalle) {
        d.denominacion = d.articuloInsumo.unidadMedida.denominacion;
      }
    }
  }

  getMedidaXid(id: number) {
    for (let u of this.uMedidas) {
      if (u.id == id) {
        return u;
      }
    }
  }

  getUnidad(id: number, i: number) {
    let ins: Insumo = this.getInsumoxId(id);
    // return ins.unidadMedida.denominacion;

    console.log("El valor de i es : ", i);
    console.log("El id es : ", id);
    console.log("La unidad de medida es : ", ins.unidadMedida.denominacion);
    // this.articuloManufacturado.manufacturadoDetalle[i]
    // .articuloInsumo.unidadMedida.denominacion = ins.unidadMedida.denominacion;
    this.articuloManufacturado.manufacturadoDetalle[i].denominacion = ins.unidadMedida.denominacion;
  }

  guardar(forma: NgForm) {

    if (this.articuloManufacturado.id == null) {
      this.articuloManufacturado.rubro = this.getRubroxId(this.indice);

      for (let d of this.articuloManufacturado.manufacturadoDetalle) {
        d.articuloInsumo = this.getInsumoxId(d.articuloInsumo.id);
      }
      for (let d of this.articuloManufacturado.manufacturadoDetalle) {
        d.unidadMedida = this.getMedidaXid(d.unidadMedida.id);
      }
    }
    console.log("El plato es : ", this.articuloManufacturado);

    this.manufacturadoServ.setManufacturado(this.articuloManufacturado).subscribe((data: any) => {

      if (this.file != null) {
        const img = new FormData();
        img.append('file', this.file);
        img.append('id', this.articuloManufacturado.denominacion);

        this.manufacturadoServ.updateImage(img).subscribe((res: any) => {

          console.log('La respuesta del servidor', data);
          console.log('La respuesta del servidor img', res);
          alert("Insumo guardado");
          forma.reset();
          this.indice = 0;
          this.resetManufacturado();
          this.photoSelected = null;
          this.manufacturados = [];
          this.getManufacturadoPag();
          this.file = null;

        }, error => console.log(error));
      } else {
        console.log('La respuesta del servidor', data);
        alert("Insumo guardado");
        forma.reset();
        this.indice = 0;
        this.resetManufacturado();
        this.photoSelected = null;
        this.manufacturados = [];
        this.getManufacturadoPag();
        this.file = null;

      }


    }, error => console.log(error)
    );


  }

  setManufacturado(index: number) {
    this.file = null;
    this.articuloManufacturado = this.manufacturados[index];
    console.log("El insumo desde actualizar es : ", this.articuloManufacturado);
    this.indice = this.articuloManufacturado.rubro.id;
    this.articuloManufacturado.fechaModificacion = Date.now();
    this.articuloManufacturado.usuarioModificacion = localStorage.getItem('email');
    this.photoSelected = `http://localhost:9000/reventa/imagen/${this.articuloManufacturado.image}`;

  }
  eliminar(index: number) {
    console.log("Se ejecuto eliminar con el index ", index);
    let eliminar = confirm('Se eliminara el articulo');

    if (eliminar) {

      this.articuloManufacturado = this.manufacturados[index];
      this.articuloManufacturado.fechaBaja = Date.now();
      this.articuloManufacturado.usuarioBaja = localStorage.getItem('email');
      this.manufacturadoServ.setManufacturado(this.articuloManufacturado).subscribe((data: any) => {

        console.log('La respuesta del servidor', data);
        alert("Insumo Eliminado");

        this.resetManufacturado();
        this.manufacturados = [];
        this.getManufacturadoPag();
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

  getInsumoxId(id) {
    for (let insumo of this.insumos) {
      if (insumo.id == id) {
        return insumo;
      }
    }
  }

  onPhotoSelected(event) {

    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      // imagen preview
      const reader = new FileReader
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }

  }
  resetManufacturado() {

    this.indice = 0;
    this.articuloManufacturado = {
      denominacion: null,
      precioVenta: null,
      tiempoEstimadoCocina: null,
      usuarioCarga: localStorage.getItem('email'),
      fechaAlta: Date.now(),
      rubro: {
      },
      manufacturadoDetalle: [
        {
          unidadMedida: {
            id: 0
          },
          cantidad: null,
          articuloInsumo: {
            id: 0
          }
        }
      ]
    };
    this.photoSelected = null;
    console.log("Se ejecuto reset");
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.getManufacturadoPag();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.getManufacturadoPag();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.getManufacturadoPag();
  }

}