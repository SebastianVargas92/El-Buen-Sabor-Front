import { Component, OnInit } from '@angular/core';
import { RubroGeneralService } from '../../../services/rubro-general.service';
import { RubroGeneral } from '../../../modelo/rubro-general';

@Component({
  selector: 'app-rubro-general',
  templateUrl: './rubro-general.component.html',
  styleUrls: ['./rubro-general.component.css']
})
export class RubroGeneralComponent implements OnInit {

  rubroGeneral: RubroGeneral = {
    denominacion: null,
    usuarioCarga: localStorage.getItem('email'),
    fechaAlta: Date.now(),
  };

  rubros: [];
  totalPages: Array<number>;

  page = 0;
  size = 4;

  isFirst = false;
  isLast = false;

  constructor(private rubroService: RubroGeneralService) { 
    this.getRubArtPag();
  }

  ngOnInit(): void {
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
   
    console.log('El rubro a guardar es : ', this.rubroGeneral);

    this.rubroService.setRubro(this.rubroGeneral).subscribe((data: any) => {

      console.log('La respuesta del servidor', data);
      alert("Rubro guardado");
      forma.reset();
      this.rubros = [];
      this.getRubArtPag();
    }, error => console.log(error)
    );

  }

  setRubroGeneral(index: number) {
    this.rubroGeneral = this.rubros[index];
    console.log("El insumo desde actualizar es : ", this.rubroGeneral);
    
    this.rubroGeneral.fechaModificacion = Date.now();
    this.rubroGeneral.usuarioModificacion = localStorage.getItem('email');

  }
  eliminar(index: number) {
    console.log("Se ejecuto eliminar con el index ", index);
    let eliminar = confirm('Se eliminara el articulo');

    if (eliminar) {

      this.rubroGeneral = this.rubros[index];
      this.rubroGeneral.fechaBaja = Date.now();
      this.rubroGeneral.usuarioBaja = localStorage.getItem('email');
      this.rubroService.setRubro(this.rubroGeneral).subscribe((data: any) => {

        console.log('La respuesta del servidor', data);
        alert("Rubro Articulo Eliminado");

        this.resetRubGene();
        this.rubros = [];
        this.getRubArtPag();
      }, error => console.log(error)
      );

    }

  }

  resetRubGene() {
    this.rubroGeneral = {
      denominacion: null,
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
