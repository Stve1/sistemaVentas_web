import { apiURLSettings } from './../../utils/constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { beProductos } from '../../models/beProductos';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiURLSettings: string = apiURLSettings.url_api_bingoNova;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<beProductos[]> {
    return this.http.get<beProductos[]>(`${this.apiURLSettings}/productos/obtenerProductos`);
  }

  insertVentasTot(body:any){
    return this.http.post(`${this.apiURLSettings}/productos/registrarVentas`, body);
  }

  insertProdVentas(body:any){
    return this.http.post(`${this.apiURLSettings}/productos/registrarProductos`, body);
  }

  //POST return this.http.post<any>(this.urlServicio+"/Serie_Sorteo/AdicionarSerie_Sorteos_Metavolante?numeracionSerie=", body)
  //DELETE return this.http.delete<any>(`${this.urlServicio}/Serie_Sorteo/EliminarSeriesSorteoSimultanea`);

}
