import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//imports para imprimir pdf
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/venta/home/home.component';

import { environment } from '../environments/environment';

import {HttpClientModule} from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ResetPassComponent } from './components/user/reset-pass/reset-pass.component';
import { EditarComponent } from './components/cliente/editar/editar.component';
import { VerificacionComponent } from './components/user/verificacion/verificacion.component';
import { LandingComponent } from './components/landing/landing.component';
import { RubroArticuloComponent } from './components/admin/rubro-articulo/rubro-articulo.component';
import { RubroGeneralComponent } from './components/admin/rubro-general/rubro-general.component';
import { ArticuloReventaComponent } from './components/admin/articulo-reventa/articulo-reventa.component';
import { ArticuloInsumoComponent } from './components/admin/articulo-insumo/articulo-insumo.component';
import { ArticuloManufacturadoComponent } from './components/admin/articulo-manufacturado/articulo-manufacturado.component';
import { CarritoComponent } from './components/venta/carrito/carrito.component';
import { ManufacturadoComponent } from './components/venta/manufacturado/manufacturado.component';
import { ReventaComponent } from './components/venta/reventa/reventa.component';
import { PedidoComponent } from './components/admin/pedido/pedido.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { MasPedidasComponent } from './components/estadistica/mas-pedidas/mas-pedidas.component';
import { IngresosComponent } from './components/estadistica/ingresos/ingresos.component';
import { PedidoClienteComponent } from './components/estadistica/pedido-cliente/pedido-cliente.component';
import { ControlStockComponent } from './components/estadistica/control-stock/control-stock.component';

PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ResetPassComponent,
    EditarComponent,
    VerificacionComponent,
    LandingComponent,
    RubroArticuloComponent,
    RubroGeneralComponent,
    ArticuloReventaComponent,
    ArticuloInsumoComponent,
    ArticuloManufacturadoComponent,
    CarritoComponent,
    ManufacturadoComponent,
    ReventaComponent,
    PedidoComponent,
    UsuarioComponent,
    MasPedidasComponent,
    IngresosComponent,
    PedidoClienteComponent,
    ControlStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    AngularFireDatabaseModule
  ],
  providers: [ AngularFireAuth ],
  bootstrap: [AppComponent]
})
export class AppModule { }
