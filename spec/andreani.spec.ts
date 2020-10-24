import { Andreani } from "../src/index";
import { expect } from 'chai'
import { existsSync } from 'fs'
import { join } from 'path'
let credentials
if ( existsSync( join( process.cwd(), 'src', 'credentials.json' ) ))
    credentials = require( join( process.cwd(), 'src', 'credentials.json' ))
else {
    console.error(`Para ejecutar el test debe definir credenciales en ${process.cwd()}/src/credentials.json`)
    process.exit()
}

let andreani = new Andreani(credentials)

let NUMERO_ANDREANI: string

describe('Cotizaciones', function(){
    it('Pide cotización de un envío a domicilio', async function(){
        let data = await andreani.cotizarEnvioDomicilio({
            cpDestino: 2700,
            sucursalOrigen: "TOM",
            bultos: [
                {
                    volumen: 25,
                    kilos: 15,
                    valorDeclarado: 170
                }
            ]
        })
        expect(data).to.have.property("pesoAforado")
        expect(data).to.have.property("tarifaSinIva")
        expect(data).to.have.property("tarifaConIva")
    })
    it('Pide cotización de un envío a sucursal', async function(){
        let data = await andreani.cotizarEnvioSucursal({
            cpDestino: 2700,
            sucursalOrigen: "TOM",
            bultos: [
                {
                    volumen: 25,
                    kilos: 15,
                    valorDeclarado: 170
                }
            ]
        })
        expect(data).to.have.property("pesoAforado")
        expect(data).to.have.property("tarifaSinIva")
        expect(data).to.have.property("tarifaConIva")
    })
})

describe('Listados', function() {
    it('Obtiene listado de provincias', async function() {
        let data = await andreani.listarProvincias()
        expect(data).to.be.an("array")
        expect(data[0]).to.have.property("meta")
        expect(data[0]).to.have.property("contenido")
    })
    it('Obtiene listado de sucursales', async function() {
        let data = await andreani.listarSucursales()
        expect(data).to.be.an("array")
        expect(data[0].id).to.be.a("number")
    })
})

describe('Ordenes', function() {
    it('Crear una nueva orden a domicilio', async function() {
        let data = await andreani.crearOrdenDomicilio({
            //contrato: "400006711",
            origen: {
                postal: {
                    codigoPostal: "3378",
                    calle: "Av Falsa",
                    numero: "380",
                    localidad: "Puerto Esperanza",
                    region: "",
                    pais: "Argentina",
                    componentesDeDireccion: [
                        {
                            meta: "entreCalle",
                            contenido: "Medina y Jualberto"
                        }
                    ]
                }
            },
            destino: {
                postal: {
                    codigoPostal: "1292",
                    calle: "Macacha Guemes",
                    numero: "28",
                    localidad: "C.A.B.A.",
                    region: "AR-B",
                    pais: "Argentina",
                    componentesDeDireccion: [
                        {
                            meta: "piso",
                            contenido: "2"
                        },
                        {
                            meta: "departamento",
                            contenido: "B"
                        }
                    ]
                }
            },
            remitente: {
                nombreCompleto: "Alberto Lopez",
                email: "remitente@andreani.com",
                documentoTipo: "DNI",
                documentoNumero: "33111222",
                telefonos: [
                    {
                        tipo: 1,
                        numero: "113332244"
                    }
                ]
            },
            destinatario: [
                {
                    nombreCompleto: "Juana Gonzalez",
                    email: "destinatario@andreani.com",
                    documentoTipo: "DNI",
                    documentoNumero: "33999888",
                    telefonos: [
                        {
                            tipo: 1,
                            numero: "1112345678"
                        }
                    ]
                },
                {
                    nombreCompleto: "Jose Gonzalez",
                    email: "alter@andreani.com",
                    documentoTipo: "DNI",
                    documentoNumero: "33922288",
                    telefonos: [
                        {
                            tipo: 1,
                            numero: "153111231"
                        }
                    ]
                }
            ],
            productoAEntregar: "Aire Acondicionado",
            bultos: [
                {
                    kilos: 2,
                    largoCm: 10,
                    altoCm: 50,
                    anchoCm: 10,
                    volumenCm: 5000,
                    valorDeclaradoSinImpuestos: 1200,
                    valorDeclaradoConImpuestos: 1452,
                    referencias: [
                        {
                            meta: "detalle",
                            contenido: "Secador de pelo"
                        },
                        {
                            meta: "idCliente",
                            contenido: "10000"
                        }
                    ]
                }
            ]
        })
        expect(data.tipo).to.be.equal("B2C")
        expect(data.bultos[0].numeroDeEnvio).to.be.a("string")
        NUMERO_ANDREANI = data.bultos[0].numeroDeEnvio
    })
    it('Crear una nueva orden a sucursal', async function() {
        let data = await andreani.crearOrdenSucursal({
            //contrato: "400006711",
            origen: {
                postal: {
                    codigoPostal: "3378",
                    calle: "Av Falsa",
                    numero: "380",
                    localidad: "Puerto Esperanza",
                    region: "",
                    pais: "Argentina",
                    componentesDeDireccion: [
                        {
                            meta: "entreCalle",
                            contenido: "Medina y Jualberto"
                        }
                    ]
                }
            },
            destino: {
                sucursal: {
                    id: "10000"
                }
            },
            remitente: {
                nombreCompleto: "Alberto Lopez",
                email: "remitente@andreani.com",
                documentoTipo: "DNI",
                documentoNumero: "33111222",
                telefonos: [
                    {
                        tipo: 1,
                        numero: "113332244"
                    }
                ]
            },
            destinatario: [
                {
                    nombreCompleto: "Juana Gonzalez",
                    email: "destinatario@andreani.com",
                    documentoTipo: "DNI",
                    documentoNumero: "33999888",
                    telefonos: [
                        {
                            tipo: 1,
                            numero: "1112345678"
                        }
                    ]
                },
                {
                    nombreCompleto: "Jose Gonzalez",
                    email: "alter@andreani.com",
                    documentoTipo: "DNI",
                    documentoNumero: "33922288",
                    telefonos: [
                        {
                            tipo: 1,
                            numero: "153111231"
                        }
                    ]
                }
            ],
            productoAEntregar: "Aire Acondicionado",
            bultos: [
                {
                    kilos: 2,
                    largoCm: 10,
                    altoCm: 50,
                    anchoCm: 10,
                    volumenCm: 5000,
                    valorDeclaradoSinImpuestos: 1200,
                    valorDeclaradoConImpuestos: 1452,
                    referencias: [
                        {
                            meta: "detalle",
                            contenido: "Secador de pelo"
                        },
                        {
                            meta: "idCliente",
                            contenido: "10000"
                        }
                    ]
                }
            ]
        })
        expect(data).to.have.property("tipo").to.be.equal("B2C")
    })
    it('Obtiene una orden creada', async function() {
        let data = await andreani.obtenerOrden(NUMERO_ANDREANI)
        expect(data).has.property('bultos').to.be.an("array")
    })
})