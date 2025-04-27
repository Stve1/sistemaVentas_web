import { apiURLSettings } from './../../utils/constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { beProductos } from '../../models/beProductos';
import { beMetodos } from '../../models/beMetodos';
import { BeRes } from '../../models/BeRes';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiURLSettings: string = apiURLSettings.url_api_bingoNova;
  id_unidad: number = 1;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<BeRes> {
    return this.http.get<BeRes>(`${this.apiURLSettings}/productos/obtenerProductos`);
  }

  insertVentasTot(body:any){
    return this.http.post(`${this.apiURLSettings}/productos/registrarVentas`, body);
  }

  insertProdVentas(body:any){
    return this.http.post(`${this.apiURLSettings}/productos/registrarProductos`, body);
  }

  getMetodosPago(): Observable<beMetodos[]> {
    return this.http.get<beMetodos[]>(`${this.apiURLSettings}/productos/obtenerMetodosPagos?id_unidad=${this.id_unidad}`);
  }

  //POST return this.http.post<any>(this.urlServicio+"/Serie_Sorteo/AdicionarSerie_Sorteos_Metavolante?numeracionSerie=", body)
  //DELETE return this.http.delete<any>(`${this.urlServicio}/Serie_Sorteo/EliminarSeriesSorteoSimultanea`);

}
