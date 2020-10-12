import { Domicilio } from './domicilio';
export interface Usuario {
    id?:number
    nombre?:string,
    apellido?:string,
    correo?:string,
    rol:any,
    telefono?:number,
    domicilio?:Domicilio
}
