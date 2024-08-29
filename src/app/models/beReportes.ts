export interface beReportes {
  id_venta: number,
  fecha_venta: string,
  total_descuento: number,
  total_incremento: number,
  total_venta: number,
  id_cliente: number,
  cantidad_productos: number,
}

export interface beReportesVentas {
  id_venta: number,
  fecha_venta: string,
  total_descuento: number,
  total_incremento: number,
  cantidad_productos: number,
  total_venta: number,
  id_cliente: number,
  nombre_cliente: string
}

export interface beReportesSalidas {
  id_salida: number,
  descripcion_salida: string,
  valor_salida: number,
  metodo_pago_salida: number,
  descripcion_metodo_pago: string,
  fecha_registro_salida: Date
}
