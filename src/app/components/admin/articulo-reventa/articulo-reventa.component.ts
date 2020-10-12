import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RubroArticuloService } from '../../../services/rubro-articulo.service';
import { ReventaService } from '../../../services/reventa.service';
import { MedidaService } from '../../../services/medida.service';
import { Reventa } from 'src/app/modelo/reventa';
@Component({
  selector: 'app-articulo-reventa',
  templateUrl: './articulo-reventa.component.html',
  styleUrls: ['./articulo-reventa.component.css']
})
export class ArticuloReventaComponent implements OnInit {
  articuloReventa: Reventa = {
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
  ]; */

  rubros: any[];

  reventa: [];

  totalPages: Array<number>;

  page = 0;
  size = 4;

  isFirst = false;
  isLast = false;
  order = 'id';
  asc = true;

  indice = 0;
  medida = 5;

  file;

  photoSelected: string | ArrayBuffer;

  constructor(private rubroService: RubroArticuloService, private reventaServ: ReventaService, private medidaServ: MedidaService) {
    rubroService.getRubros().subscribe((data: any) => {
      this.rubros = data;
      console.log("La data desde data", data);
    }, error => console.log(error)
    );
    medidaServ.getMedidas().subscribe((data: any) => {
      this.uMedidas = data;
    }, error => console.log(error));

    this.getReventaPag();
  }


  ngOnInit(): void {
  }

  buscar(termino: string) {
    if (termino.length > 0) {
      this.getReventaPagB(termino);
    } else {
      this.getReventaPag();
    }
  }

  getReventa() {
    this.reventaServ.getReventa().subscribe((data: any) => {
      this.reventa = data;
    }, error => console.log(error)
    );

  }

  getReventaPag() {
    this.reventaServ.getReventaPag(this.page, this.size,this.order,this.asc).subscribe((data: any) => {
      console.log("data desde pageable ", data);
      this.reventa = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error)
    );
  }

  getReventaPagB(termino: string) {
    this.reventaServ.getReventaPagB(this.page, this.size,this.order,this.asc, termino).subscribe((data: any) => {
      console.log("data desde pageable ", data);
      this.reventa = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error)
    );
  }

  guardar(forma: NgForm) {
    this.articuloReventa.rubroArticulo.id = this.indice;

    console.log('forma ', forma);
    console.log('valor ', forma.value);
    console.log('El insumo es : ', this.articuloReventa);
    console.log('La medida es : ', this.medida);
    this.articuloReventa.unidadMedida = this.getMedidaXid(5);

    const data = new FormData();
    data.append('denominacion', this.articuloReventa.denominacion);
    data.append('precio_compra', this.articuloReventa.precioCompra.toString());
    data.append('precio_venta', this.articuloReventa.precioVenta.toString());
    data.append('actual', this.articuloReventa.stockActual.toString());
    data.append('minimo', this.articuloReventa.stockMinimo.toString());
    // data.append('medida', this.articuloReventa.unidadMedida);
    data.append('medida', this.articuloReventa.unidadMedida.id);
    data.append('id_rubro', this.articuloReventa.rubroArticulo.id.toString());
    data.append('u_alta', this.articuloReventa.usuarioCarga);
    data.append('file', this.file);

    this.reventaServ.setReventa(data).subscribe((data: any) => {

      console.log('La respuesta del servidor', data);
      alert("Insumo guardado");
      forma.reset();
      this.indice = 0;
      this.medida = 0;
      this.articuloReventa.unidadMedida = 0;
      this.photoSelected = null;
      this.reventa = [];
      this.getReventaPag();
      this.file = null;
    }, error => console.log(error)
    );
  }

  actualizar() {
    console.log("Se apreto actualizar");
    console.log(this.articuloReventa);
    this.articuloReventa.unidadMedida = this.getMedidaXid(5);
    this.articuloReventa.rubroArticulo = this.getRubroxId(this.indice);
    this.reventaServ.updateReventa(this.articuloReventa).subscribe((data: any) => {
      console.log('La respuesta del servidor', data);

      if (this.file != null) {
        const img = new FormData();
        img.append('file', this.file);
        img.append('id', this.articuloReventa.id.toString());
        this.reventaServ.updateImage(img).subscribe((data: any) => {

          console.log('La respuesta del servidor', data);
          alert("Articulo Actualizado");
          this.indice = 0;
          this.medida = 0;
          this.articuloReventa.unidadMedida = 0;
          this.photoSelected = null;
          this.reventa = [];
          this.getReventaPag();
          this.file = null;
        }, error => console.log(error)
        );
      } else {
        alert("Articulo Actualizado");
        this.indice = 0;
        this.articuloReventa.unidadMedida = 0;
        this.photoSelected = null;
        this.reventa = [];
        this.getReventaPag();
        this.resetReventa();
      }
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

  setReventa(index: number) {
    this.file = null;
    this.articuloReventa = this.reventa[index];
    console.log("El insumo desde actualizar es : ", this.articuloReventa);
    this.medida = this.articuloReventa.unidadMedida.id;
    this.indice = this.articuloReventa.rubroArticulo.id;
    this.articuloReventa.fechaModificacion = Date.now();
    this.articuloReventa.usuarioModificacion = localStorage.getItem('email');
    this.photoSelected = `http://localhost:9000/reventa/imagen/${this.articuloReventa.imagen}`;

  }
  eliminar(index: number) {
    console.log("Se ejecuto eliminar con el index ", index);
    let eliminar = confirm('Se eliminara el articulo');

    if (eliminar) {

      this.articuloReventa = this.reventa[index];
      this.articuloReventa.fechaBaja = Date.now();
      this.articuloReventa.usuarioBaja = localStorage.getItem('email');
      this.reventaServ.updateReventa(this.articuloReventa).subscribe((data: any) => {

        console.log('La respuesta del servidor', data);
        alert("Insumo Eliminado");
        this.articuloReventa.unidadMedida = 0;
        this.resetReventa();
        this.reventa = [];
        this.getReventaPag();
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

  onPhotoSelected(event) {

    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      // imagen preview
      const reader = new FileReader
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }

  }
  resetReventa() {
    this.indice = 0;
    this.medida = 0;
    this.articuloReventa = {
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
    this.photoSelected = null;

  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.getReventaPag();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.getReventaPag();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.getReventaPag();
  }

}
