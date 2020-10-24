import { MetaContenido } from "./metas.model";

export interface Direccion {
    componentesDeDireccion?: MetaContenido[]
    codigoPostal: string
    calle: string
    numero: string
    localidad: string
    region?: string
    pais?: string
}