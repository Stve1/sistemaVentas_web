import { BeCosto } from "./BeCosto";
import { BePrecio } from "./BePrecio";
import { BeSubcategoria } from "./BeSubcategoria";

export interface beProductos {
  id_producto: number,
  nombre_producto: string,
  aplicacion_productos: string,
  cant_producto: number,
  cod_producto: number,
  bePrecio: BePrecio[],
  beCosto: BeCosto[],
  beSubcategoria: BeSubcategoria
}
