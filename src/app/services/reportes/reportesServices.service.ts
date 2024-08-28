import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { beProductos } from '../../models/beProductos';
import { apiURLSettings } from '../../utils/constant';
import { beReportes, beReportesSalidas, beReportesVentas } from '../../models/beReportes';
import { beSalidas } from '../../models/beSalidas';

@Injectable({
  providedIn: 'root'
})
export class ReportesServicesService {

  private apiURLSettings: string = apiURLSettings.url_api_bingoNova;
  //private id_unidad: number = 1;

  constructor(private http:HttpClient ) { }

  getReportesDiarios(fechaInicio: string, fechaFin: string, id_unidad: number): Observable<beReportesVentas[]> {
    return this.http.get<beReportesVentas[]>(`${this.apiURLSettings}/reportes/reportesDiarios?fechaIni=${fechaInicio}&fechaFin=${fechaFin}&id_unidad=${id_unidad}`);
  }

  insertVentasTot(body:any){
    return this.http.post(`${this.apiURLSettings}/productos/registrarVentas`, body);
  }

  insertSalidas(body:any){
    return this.http.post<beSalidas>(`${this.apiURLSettings}/reportes/registrarSalida`, body);
  }

  getReportesSalidas(fechaInicio: string, fechaFin: string, id_unidad: number): Observable<beReportesSalidas[]> {
    return this.http.get<beReportesSalidas[]>(`${this.apiURLSettings}/reportes/obtenerSalidas?fechaIni=${fechaInicio}&fechaFin=${fechaFin}&id_unidad=${id_unidad}`);
  }

}
