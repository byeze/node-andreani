interface Options {
  sandbox_url: string;
  production_url: string;
  /** Usar url de sandbox o producción */
  use: "sandbox" | "production";
}
