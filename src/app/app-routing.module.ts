import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/venta/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ResetPassComponent } from './components/user/reset-pass/reset-pass.component';
import { EditarComponent } from './components/cliente/editar/editar.component';
import { VerificacionComponent } from './components/user/verificacion/verificacion.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { RubroGeneralComponent } from './components/admin/rubro-general/rubro-general.component';
import { RubroArticuloComponent } from './components/admin/rubro-articulo/rubro-articulo.component';
import { ArticuloInsumoComponent } from './components/admin/articulo-insumo/articulo-insumo.component';
import { ArticuloReventaComponent } from './components/admin/articulo-reventa/articulo-reventa.component';
import { ArticuloManufacturadoComponent } from './components/admin/articulo-manufacturado/articulo-manufacturado.component';
import { CarritoComponent } from './components/venta/carrito/carrito.component';
import { PedidoComponent } from './components/admin/pedido/pedido.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { ControlStockComponent } from './components/estadistica/control-stock/control-stock.component';
import { IngresosComponent } from './components/estadistica/ingresos/ingresos.component';
import { MasPedidasComponent } from './components/estadistica/mas-pedidas/mas-pedidas.component';
import { PedidoClienteComponent } from './components/estadistica/pedido-cliente/pedido-cliente.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user/login', component: LoginComponent  },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/reset', component: ResetPassComponent },
  { path: 'cliente/edit', component: EditarComponent , canActivate:[AuthGuard],data:{expectedRol:['cliente','cocinero','admin','cajero']}},
  { path: 'user/verificacion', component: VerificacionComponent , canActivate:[AuthGuard], data: { expectedRol: ['admin','cliente','cocinero','cajero']} },
  { path: 'landing', component: LandingComponent},
  { path: '', component: LandingComponent},
  { path: 'admin/rgeneral', component: RubroGeneralComponent , canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/rarticulo', component: RubroArticuloComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/insumo', component: ArticuloInsumoComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/reventa', component: ArticuloReventaComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/manufacturado', component: ArticuloManufacturadoComponent, canActivate:[AuthGuard],data:{expectedRol:['admin','cocinero']}},
  { path: 'carrito', component: CarritoComponent, canActivate:[AuthGuard],data:{expectedRol:['cliente','cocinero','admin']}},
  { path: 'admin/pedido', component: PedidoComponent, canActivate:[AuthGuard],data:{ expectedRol: ['admin','cliente','cocinero','cajero']} },
  { path: 'admin/stock', component: ControlStockComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/ingresos', component: IngresosComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/maspedidas', component: MasPedidasComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/pcliente', component: PedidoClienteComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: 'admin/usuario', component: UsuarioComponent, canActivate:[AuthGuard],data:{expectedRol:['admin']}},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
