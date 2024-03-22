import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ReportesServicesService } from '../../../services/reportes/reportesServices.service';

@Component({
  imports:[ReactiveFormsModule, CommonModule, MatTableModule],
  selector: 'app-reporteSalidas',
  templateUrl: './reporteSalidas.component.html',
  styleUrls: ['./reporteSalidas.component.css'],
  standalone: true
})
export class ReporteSalidasComponent implements OnInit {

  constructor(private reportesServices: ReportesServicesService) { }

  formReportSalidas = new FormGroup({
    fechaIni: new FormControl(),
    fechaFin: new FormControl(),
    unidad: new FormControl()
  });

  exportar:boolean = false;
  salidas:any = [];
  totalValorSalida: any = 0;
  currentDate:any;
  fechaInicio: string = "";
  fechaFin:string = "";
  id_unidad: number = 1;

  ngOnInit() {
    this.currentDate = formatDate(new Date, 'yyyy-MM-dd','en-US');
    this.formReportSalidas.controls.fechaIni.setValue(this.currentDate);
    this.formReportSalidas.controls.fechaFin.setValue(this.currentDate);
    this.formReportSalidas.controls.unidad.setValue(1);
  }

  buscarReport(){

  }

  exportarExcel(){

  }

}
