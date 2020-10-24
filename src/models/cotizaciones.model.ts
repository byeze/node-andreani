import { Bulto, BultoBaseV1 } from "./bultos.model"

interface Precio {
    seguroDistribucion: string
    distribucion: string
    total: string
}

export interface Cotizacion {
    pesoAforado: string
    tarifaSinIva: Precio
    tarifaConIva: Precio
}

export interface PedidoCotizacion {
    cliente?: string
    contrato?: string
    pais?: string
    cpDestino: number
    sucursalOrigen: string
    bultos: BultoBaseV1[]
}
