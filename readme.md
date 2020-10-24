# Librería Andreani para NodeJS (UNOFFICIAL)

En esta librería se ofrecen interfaces y métodos que faciliten el uso de la API de Andreani.

## Lenguaje
Los métodos, interfaces y documentación se encuentran escritos en español, debido a que éste es el idioma oficial de la documentación en https://developers.andreani.com/ así como los endpoints de la API.

## Language
Methods, interfaces and documentation were wrote in Spanish, because this is the official language of Andreani developers documentation https://developers.andreani.com/ and all the endpoints.

## Introducción

Para poder utilizar esta librería, se asume que el desarrollador ya tiene credenciales (usuario, contraseña y contratos) válidas y habilitadas para utilizar con las versiones v1 y v2 de Andreani API.
Para obtener dichas credenciales será necesario que se comonunique con la empresa.

## Instalación

```
npm install --save-dev @nchsala/andreani
```

## Uso

```
import { Andreani } from "@nchsala/andreani"

const andreani = new Andreani({
    CONTRATO_DOMICILIO: "CONTRATO_DOMICILIO",
    CONTRATO_SUCURSAL: "CONTRATO_SUCURSAL",
    CODIGO_CLIENTE: "CODIGO_CLIENTE",
    USER: "USER",
    PASS: "PASS"
})
```

### Métodos disponibles

```
    andreani.cotizarEnvioSucursal(params: PedidoCotizacion): Promise<Cotizacion>;
    andreani.cotizarEnvioDomicilio(params: PedidoCotizacion): Promise<Cotizacion>;
    andreani.obtenerEnvio(numEnvio: string): Promise<Envio>;
    andreani.buscarEnvio(params: BuscaEnvio): Promise<Envios>;
    andreani.obtenerTrazas(numEnvio: string): Promise<TrazaEnvio[]>;
    andreani.listarProvincias(): Promise<Provincia[]>;
    andreani.listarSucursales(): Promise<SucursalCompletoV2[]>;
    andreani.crearOrdenSucursal(orden: NuevaOrden): Promise<Orden>;
    andreani.crearOrdenDomicilio(orden: NuevaOrden): Promise<Orden>;
    andreani.obtenerOrden(numOrden: string): Promise<Orden>;
    andreani.obtenerEtiqueta(remito: string): Promise<any>;
```