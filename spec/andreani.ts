import { Andreani } from "../src/index";

const credentials = require("../src/credentials.json");

const andreani = new Andreani({
  credentials,
  options: {
    use: "sandbox",
    sandbox_url: "https://apisqa.andreani.com/",
    production_url: "https://apis.andreani.com",
  },
});

andreani
  .crearOrdenSucursal({
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
            contenido: "Medina y Jualberto",
          },
        ],
      },
    },
    tipoServicio: "Sucursal",
    destino: {
      sucursal: {
        id: "10000",
      },
    },
    remitente: {
      nombreCompleto: "Alberto Lopez",
      email: "remitente@andreani.com",
      documentoTipo: "DNI",
      documentoNumero: "33111222",
      telefonos: [
        {
          tipo: 1,
          numero: "113332244",
        },
      ],
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
            numero: "1112345678",
          },
        ],
      },
      {
        nombreCompleto: "Jose Gonzalez",
        email: "alter@andreani.com",
        documentoTipo: "DNI",
        documentoNumero: "33922288",
        telefonos: [
          {
            tipo: 1,
            numero: "153111231",
          },
        ],
      },
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
            contenido: "Secador de pelo",
          },
          {
            meta: "idCliente",
            contenido: "10000",
          },
        ],
      },
    ],
  })
  .then((x: any) => {})
  .catch((x) => {});
