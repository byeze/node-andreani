import { MetaContenido } from "./metas.model";

export interface NuevoBulto extends BultoBaseV2 {
    numeroDeEnvio?: string
}

interface BultoBaseV2 {
    kilos: number
    volumenCm?: number
    largoCm?: number
    altoCm?: number
    anchoCm?: number
    valorDeclaradoSinImpuestos?: number
    valorDeclaradoConImpuestos?: number
    descripcion?: string
    referencias?: MetaContenido[]
}

export interface Bulto extends BultoBaseV2 {
    IdDeProducto: string
}

export interface BultoBaseV1 {
    volumen: number
    kilos: number
    valorDeclarado: number
    categoria?: string
}
