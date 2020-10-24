export interface Persona {
    nombreCompleto: string
    email: string
    documentoTipo: string
    documentoNumero: string
    telefonos?: Telefono[]
}

export interface Telefono {
    tipo: number
    numero: string
}

export interface MinPersona {
    nombreYApellido: string | null
    tipoYNumeroDeDocumento: string | null
    eMail: string | null
}