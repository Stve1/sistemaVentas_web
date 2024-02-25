import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { beProductos } from '../../models/beProductos';
import { apiURLSettings } from '../../utils/constant';
import { beReportes } from '../../models/beReportes';

@Injectable({
  providedIn: 'root'
})
export class ReportesServicesService {

  private apiURLSettings: string = apiURLSettings.url_api_bingoNova;

  constructor(private http:HttpClient ) { }

  getReportesDiarios(): Observable<beReportes[]> {
    return this.http.get<beReportes[]>(`${this.apiURLSettings}/reportes/reportesDiarios`);
  }

  insertVentasTot(body:any){
    return this.http.post(`${this.apiURLSettings}/productos/registrarVentas`, body);
  }
}
