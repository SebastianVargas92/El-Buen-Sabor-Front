import { Component, OnInit } from '@angular/core';
import { RubroArticuloService } from '../../../services/rubro-articulo.service';
import { RubroArticulo } from '../../../modelo/rubro-articulo';

@Component({
  selector: 'app-rubro-articulo',
  templateUrl: './rubro-articulo.component.html',
  styleUrls: ['./rubro-articulo.component.css']
})
export class RubroArticuloComponent implements OnInit {

  rubroArticulo: RubroArticulo = {
    denominacion: null,
    rubro: null,
    usuarioCarga: localStorage.getItem('email'),
    fechaAlta: Date.now(),
  }

  rubrosPadres: any[];

  rubros: [];
  totalPages: Array<number>;

  page = 0;
  size = 4;

  isFirst = false;
  isLast = false;


  indice = 0;

  constructor(private rubroService: RubroArticuloService) {

    this.getRubros();
   
    this.getRubArtPag();
  }



  ngOnInit(): void {
  }

  getRubros(){
    this.rubrosPadres = [];
    this.rubroService.getRubros().subscribe((data: any) => {
      this.rubrosPadres = data;
      console.log("Los rubros son : ", data);
    }, error => console.log(error)
    );

  }

  getRubArtPag() {
    this.rubroService.geRubArtPag(this.page, this.size).subscribe((data: any) => {
      console.log("data desde pageable ", data);
      this.rubros = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    }, error => console.log(error)
    );

  }


  guardar(forma) {
    if (this.indice != 0) {
      this.rubroArticulo.rubro = this.getRubroxId(this.indice);
    }

    console.log('El rubro a guardar es : ', this.rubroArticulo);

    this.rubroService.setRubro(this.rubroArticulo).subscribe((data: any) => {

      console.log('La respuesta del servidor', data);
      alert("Rubro guardado");
      forma.reset();
      this.indice = 0;
      this.rubros = [];
      this.getRubArtPag();
      this.getRubros();
    }, error => console.log(error)
    );

  }

  getRubroxId(id) {
    for (let rubro of this.rubrosPadres) {
      if (rubro.id == id) {
        return rubro;
      }
    }
  }

  setRubroArticulo(index: number) {
    this.rubroArticulo = this.rubros[index];
    console.log("El insumo desde actualizar es : ", this.rubroArticulo);
    if (this.rubroArticulo.rubro != null) {
      this.indice = this.rubroArticulo.rubro.id;
    }else{
      this.indice =0;
    }
    this.rubroArticulo.fechaModificacion = Date.now();
    this.rubroArticulo.usuarioModificacion = localStorage.getItem('email');

  }
  eliminar(index: number) {
    console.log("Se ejecuto eliminar con el index ", index);
    let eliminar = confirm('Se eliminara el articulo');

    if (eliminar) {

      this.rubroArticulo = this.rubros[index];
      this.rubroArticulo.fechaBaja = Date.now();
      this.rubroArticulo.usuarioBaja = localStorage.getItem('email');
      this.rubroService.setRubro(this.rubroArticulo).subscribe((data: any) => {

        console.log('La respuesta del servidor', data);
        alert("Rubro Articulo Eliminado");

        this.resetRubArt();
        this.rubros = [];
        this.getRubArtPag();
      }, error => console.log(error)
      );

    }

  }

  resetRubArt() {
    this.indice = 0;
    this.rubroArticulo = {
      denominacion: null,
      rubro: null,
      usuarioCarga: localStorage.getItem('email'),
      fechaAlta: Date.now(),
    }

  }



  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.getRubArtPag();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.getRubArtPag();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.getRubArtPag();
  }


}
