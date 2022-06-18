import axios from "axios";
import { encode } from "querystring";
import { Cotizacion, PedidoCotizacion } from "./models/cotizaciones.model";
import { BuscaEnvio, Envio, Envios, TrazaEnvio } from "./models/envios.model";
import { NuevaOrden, Orden } from "./models/ordenes.model";
import { Provincia } from "./models/provincias.model";
import { SucursalCompletoV2 } from "./models/sucursales.model";
import { Credentials } from "./models/credentials.model";

export class Andreani {
  private CONTRATO_DOMICILIO: string;
  private CONTRATO_SUCURSAL: string;
  private CODIGO_CLIENTE: string;
  private USER: string;
  private PASS: string;

  private BASE_URL = "";
  private LOGIN_URL = () => `${this.BASE_URL}/login`;
  private COT_ENV_URL = (params: string) => `${this.BASE_URL}/v1/tarifas?${params}`;
  private OBT_ENV_URL = (number: string) => `${this.BASE_URL}/v1/envios/${number}`;
  private BUS_ENV_URL = (params: string) => `${this.BASE_URL}/v1/envios?${params}`;
  private OBT_TRS_URL = (params: string) => `${this.BASE_URL}/v1/envios/${params}/trazas`;
  private OBT_REG_URL = () => `${this.BASE_URL}/v1/regiones`;
  private OBT_SUC_URL = () => `${this.BASE_URL}/v2/sucursales`;
  private CRE_ORD_URL = () => `${this.BASE_URL}/v2/ordenes-de-envio`;
  private OBT_ORD_URL = (number: string) => `${this.BASE_URL}/v2/ordenes-de-envio/${number}`;
  private OBT_ETQ_URL = (remito: string) =>
    `${this.BASE_URL}/v2/ordenes-de-envio/${remito}/etiquetas`;

  private xAuthorizationToken: string = "";
  private get configAuth() {
    return {
      headers: {
        "x-authorization-token": this.xAuthorizationToken,
      },
    };
  }

  constructor(credentials: Credentials, options: Options) {
    this.CONTRATO_DOMICILIO = credentials.CONTRATO_DOMICILIO;
    this.CONTRATO_SUCURSAL = credentials.CONTRATO_SUCURSAL;
    this.CODIGO_CLIENTE = credentials.CODIGO_CLIENTE;
    this.USER = credentials.USER;
    this.PASS = credentials.PASS;

    this.BASE_URL = options.use === "production" ? options.sandbox_url : options.production_url;
  }

  get isLogged() {
    return Boolean(this.xAuthorizationToken);
  }

  private get encryptedCredentials() {
    return Buffer.from(`${this.USER}:${this.PASS}`).toString("base64");
  }

  private async getReq(url: string) {
    return await axios.get(url, this.configAuth).then((x) => x.data);
  }

  private async postReq(url: string, body: any) {
    return await axios.post(url, body, this.configAuth).then((x) => x.data);
  }

  private async $login(): Promise<boolean> {
    const config = {
      headers: {
        Authorization: `Basic ${this.encryptedCredentials}`,
      },
    };
    const headers = await axios.get(this.LOGIN_URL(), config).then((x) => x.headers);
    this.xAuthorizationToken = headers["x-authorization-token"];
    return true;
  }

  private async $cotizarEnvio(pedido: PedidoCotizacion, destination: string = "") {
    pedido.cliente = this.CODIGO_CLIENTE;
    pedido.contrato = destination == "SUCURSAL" ? this.CONTRATO_SUCURSAL : this.CONTRATO_DOMICILIO;

    const params: any = { ...pedido };
    delete params.bultos;

    const flatBultos: any = {};
    for (const i in pedido.bultos) {
      const bulto: any = pedido.bultos[i];
      Object.keys(bulto).forEach((key: string) => {
        flatBultos[`bultos[${i}][${key}]`] = bulto[key];
      });
    }
    Object.assign(params, flatBultos);

    const queryParams = encode(params);

    return await this.getReq(this.COT_ENV_URL(queryParams));
  }

  private async $obtenerEnvio(numEnvio: string): Promise<Envio> {
    return await this.getReq(this.OBT_ENV_URL(numEnvio));
  }

  private async $buscarEnvio(params: BuscaEnvio): Promise<Envios> {
    const buscaParams: any = params;
    const queryParams = encode(buscaParams);
    return await this.getReq(this.BUS_ENV_URL(queryParams));
  }

  private async $obtenerTrazas(numEnvio: string): Promise<TrazaEnvio[]> {
    return await this.getReq(this.OBT_TRS_URL(numEnvio));
  }

  private async $listarProvincias(): Promise<Provincia[]> {
    return await this.getReq(this.OBT_REG_URL());
  }

  private async $listarSucursales(): Promise<SucursalCompletoV2[]> {
    return await this.getReq(this.OBT_SUC_URL());
  }

  private async $crearOrden(orden: NuevaOrden, sucursal: string = ""): Promise<Orden> {
    orden.contrato = sucursal == "SUCURSAL" ? this.CONTRATO_SUCURSAL : this.CONTRATO_DOMICILIO;
    if (!this.isLogged) await this.$login();
    return await this.postReq(this.CRE_ORD_URL(), orden);
  }

  private async $obtenerOrden(numOrden: string): Promise<Orden> {
    return await this.getReq(this.OBT_ORD_URL(numOrden));
  }

  private async $obtenerEtiqueta(remito: string) {
    return await this.getReq(this.OBT_ETQ_URL(remito));
  }

  async cotizarEnvioSucursal(params: PedidoCotizacion): Promise<Cotizacion> {
    if (!this.isLogged) await this.$login();
    return await this.$cotizarEnvio(params, "SUCURSAL");
  }

  async cotizarEnvioDomicilio(params: PedidoCotizacion): Promise<Cotizacion> {
    if (!this.isLogged) await this.$login();
    return await this.$cotizarEnvio(params);
  }

  async obtenerEnvio(numEnvio: string): Promise<Envio> {
    if (!this.isLogged) await this.$login();
    return await this.$obtenerEnvio(numEnvio);
  }
  async buscarEnvio(params: BuscaEnvio): Promise<Envios> {
    if (!this.isLogged) await this.$login();
    return await this.$buscarEnvio(params);
  }
  async obtenerTrazas(numEnvio: string): Promise<TrazaEnvio[]> {
    if (!this.isLogged) await this.$login();
    return await this.$obtenerTrazas(numEnvio);
  }
  async listarProvincias(): Promise<Provincia[]> {
    if (!this.isLogged) await this.$login();
    return await this.$listarProvincias();
  }
  async listarSucursales(): Promise<SucursalCompletoV2[]> {
    if (!this.isLogged) await this.$login();
    return await this.$listarSucursales();
  }
  async crearOrdenSucursal(orden: NuevaOrden): Promise<Orden> {
    if (!this.isLogged) await this.$login();
    return await this.$crearOrden(orden, "SUCURSAL");
  }
  async crearOrdenDomicilio(orden: NuevaOrden): Promise<Orden> {
    if (!this.isLogged) await this.$login();
    return await this.$crearOrden(orden);
  }
  async obtenerOrden(numOrden: string): Promise<Orden> {
    if (!this.isLogged) await this.$login();
    return await this.$obtenerOrden(numOrden);
  }
  async obtenerEtiqueta(remito: string) {
    if (!this.isLogged) await this.$login();
    return await this.$obtenerEtiqueta(remito);
  }
}
