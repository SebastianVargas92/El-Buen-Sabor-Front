import { Localidad } from './localidad';
export interface Domicilio {
    id?:number,
    calle?:string,
    numero?:number,
    localidad?:Localidad
}
