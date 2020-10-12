import { Usuario } from './usuario';
import { Factura } from './factura';
export interface Pedido {
    id?:number,
    cliente?:Usuario,
    estado:number,
    fecha:any,
    factura:Factura,
    horaEstimadaFin:any,
    numero:number,
    tipoEnvio:number,
    detallePedido:any
}
