import { NuevoBulto } from "./bultos.model";
import { Direccion } from "./localidad.mode";
import { MetaContenido } from "./metas.model";
import { Persona } from "./personas.model";
import { SucursalBase, Sucursal } from "./sucursales.model";

interface Fecha {
    fecha: string
    horaDesde: string
    horaHasta: string
}

export interface NuevaOrden {
    contrato?: string
    tipoServicio?: string
    sucursalClienteID?: string
    origen: {
        postal: Direccion
    },
    destino: {
        postal?: Direccion
        sucursal?: SucursalBase // Obligatorio para entrega en sucursal
    },
    fechaDeEntrega?: Fecha
    pagoDestino?: number
    productoAEntregar: string
    valorACobrar?: number
    remitente: Persona
    destinatario: Persona[]
    bultos: NuevoBulto[]
}

interface BultoRes {
    numeroDeBulto: string
    numeroDeEnvio: string
    totalizador: string
    linking: MetaContenido[]
}

export interface Orden {
    estado: string,
    tipo: string,
    sucursalDeDistribucion: Sucursal
    sucursalDeRendicion: Sucursal
    sucursalDeImposicion: Sucursal
    fechaCreacion: string
    zonaDeReparto: string
    numeroDePermisionaria: string
    descripcionServicio: string
    etiquetaRemito: string
    bultos: BultoRes[]
    fechaEstimadaDeEntrega: string
    huellaDeCarbono: string
    gastoEnergetico: string
}