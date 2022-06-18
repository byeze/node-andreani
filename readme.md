# Andreani Shipping Library

En esta librería se ofrecen interfaces y métodos que faciliten el uso de la API de Andreani.

## Instalación

```
npm install --save node-andreani
```

## Uso

```js
import { Andreani } from "node-andreani";

const andreani = new Andreani({
  credentials: {
    CONTRATO_DOMICILIO: "CONTRATO_DOMICILIO",
    CONTRATO_SUCURSAL: "CONTRATO_SUCURSAL",
    CODIGO_CLIENTE: "CODIGO_CLIENTE",
    USER: "USER",
    PASS: "PASS",
  },
  options: {
    use: "sandbox",
    sandbox_url: "https://apisqa.andreani.com/",
    production_url: "https://apis.andreani.com",
  },
});
```
