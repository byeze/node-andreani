import { Direccion } from "./localidad.mode";
import { MetaContenido } from "./metas.model";
import { Telefono } from "./personas.model";

export interface SucursalBase {
    id: string
}

export interface Sucursal extends SucursalBase {
    nomenclatura: string
    descripcion: string
}

export interface SucursalCompletoV2 {
    id: number,
    codigo: string,
    numero: string,
    descripcion: string,
    canal: string,
    direccion: Direccion,
    coordenadas: Coordenadas,
    horarioDeAtencion: string
    datosAdicionales?: DatosAdicionales,
    telefonos?: Telefono,
    codigosPostalesAtendidos: string[]
}

interface Coordenadas {
    latitud: number
    longitud: number
}

interface Geocoordenadas extends Coordenadas {
    elevacion?: number
}

interface DatosAdicionales {
    seHaceAtencionAlCliente: boolean
    tipo: string
}