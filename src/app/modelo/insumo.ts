import { RubroArticulo } from './rubro-articulo';

export interface Insumo {
    id?:number,
    denominacion?: string,
    precioCompra?: number,
    precioVenta?: number,
    stockActual?: number,
    stockMinimo?: number,
    unidadMedida?:any,
    rubroArticulo?:RubroArticulo,
    usuarioCarga?: string,
    fechaAlta?: any,
    fechaBaja?:any,
    usuarioBaja?:string,
    fechaModificacion?:any,
    usuarioModificacion?:string
}
