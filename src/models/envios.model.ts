import { Bulto } from "./bultos.model";
import { Direccion } from "./localidad.mode";
import { MinPersona } from "./personas.model";
import { Sucursal } from "./sucursales.model";

interface Eventos {
    Fecha: string
    Estado: string
    Motivo: string
    Submotivo?:string | null
    SubmotivoId?: number
    Sucursal: string
    SucursalId: number
    Ciclo: string
}

export interface TrazaEnvio {
    eventos: Eventos[]
}

export interface Envio {
    numeroDeTracking: string,
    contrato: string,
    estado: string,
    sucursalDeDistribucion: Sucursal,
    fechaCreacion: string,
    destino: {
        Postal: Direccion
    },
    remitente: MinPersona,
    destinatario: MinPersona,
    bultos: Bulto[],
    referencias: string[]
}

export interface Envios {
    envios: Envio[]
}

export interface BuscaEnvio {
    codigoCliente?: string
    idDeProducto?: string
    numeroDeDocumentoDestinatarios?: string
    fechaCreacionHasta?: string
    fechaCreacionDesde?: string
    contrato?: string
    limit?: string
}