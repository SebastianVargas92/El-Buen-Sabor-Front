import { RubroGeneralService } from './../../../services/rubro-general.service';
import { Component, OnInit } from '@angular/core';
import { ManufacturadoService } from '../../../services/manufacturado.service';
import { ReventaService } from '../../../services/reventa.service';
import { RubroArticuloService } from '../../../services/rubro-articulo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public platos: any[];

  bebidas: any[];

  totalPages: Array<number>;

  rubro = 0;
  rubroA :number=0;

  page = 0;
  size = 6;

  isFirst = false;
  isLast = false;


  totalPagesb: Array<number>;

  pageb = 0;
  sizeb = 6;
  order = 'id';
  asc = true;
  isFirstb = false;
  isLastb = false;

  rubros: any[];
  rubrosA: any[];

  constructor(private servMan: ManufacturadoService, private servRev: ReventaService, 
    private servR: RubroGeneralService, private servRA: RubroArticuloService) {
    servR.getRubros().subscribe((data: any) => {
      this.rubros = data;
    }, error => console.log(error));

    servRA.geRubrosR(23).subscribe((data: any) => {
      this.rubrosA = data;
      console.log("La data es : ", data);
    }, error => console.log(error));

    this.getManufacturadoPag();
    this.getReventaPag();

  }

  ngOnInit(): void {
    // this.rol = localStorage.getItem('rol');
  }

  buscar(termino: string){

    if(termino.length > 0){
      this.getManufacturadoPagB(termino);
    }else{
      this.getManufacturadoPag();
    }

  }

  getManufacturadoPag() {
    this.servMan.getManufacturadoPagR(this.page, this.size,this.order,this.asc, this.rubro).subscribe((data: any) => {
      this.platos = data.content;
      console.log("Los platos son : ", this.platos);
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);

    }, error => console.log(error));

  }

  getManufacturadoPagB(termino: string) {
    this.servMan.getManufacturadoPagRB(this.page, this.size,this.order,this.asc, this.rubro, termino).subscribe((data: any) => {
      this.platos = data.content;
      console.log("Los platos son : ", this.platos);
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);

    }, error => console.log(error));

  }

  getReventaPag() {
    this.servRev.getReventaPag(this.pageb, this.sizeb, this.order, this.asc).subscribe((data: any) => {
      this.bebidas = data.content;
      console.log("Las bebidas son : ", this.bebidas);
      this.isFirstb = data.first;
      this.isLastb = data.last;
      this.totalPagesb = new Array(data.totalPages);

    }, error => console.log(error));
  }

  getReventa(){
    if(this.rubroA == 0 || this.rubroA == 23){
      this.getReventaPag();

    }else{
      this.getReventaRub();
    }
  }

  getReventaRub(){
    this.servRev.getReventaR(this.rubroA).subscribe((data: any) => {
      this.bebidas = data;
      console.log("Las bebidas son : ", this.bebidas);
    }, error => console.log(error));
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

  rewindb(): void {
    if (!this.isFirstb) {
      this.pageb--;
      this.getReventaPag();
    }
  }

  forwardb(): void {
    if (!this.isLastb) {
      this.pageb++;
      this.getReventaPag();
    }
  }

  setPageb(pageb: number): void {
    this.pageb = pageb;
    this.getReventaPag();
  }

}
