import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportesServicesService } from '../../../../services/reportes/reportesServices.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportesVentaComponent',
  imports:[ReactiveFormsModule, CommonModule, MatTableModule],
  standalone: true,
  templateUrl: './reportesVentaComponent.component.html',
  styleUrls: ['./reportesVentaComponent.component.css'],

})
export class ReportesVentaComponentComponent implements OnInit {
  //@ViewChild('ventasTable', {static: false}) ventasTable: ElementRef;

  constructor(private reportesServices: ReportesServicesService) { }

  formReportVentas = new FormGroup({
    fechaIni: new FormControl(),
    fechaFin: new FormControl(),
    unidad: new FormControl()
  });

  ventas:any;
  currentDate:any;
  fechaInicio: string = "";
  fechaFin:string = "";
  id_unidad: number = 1;

  exportar: boolean = false;
  ngOnInit() {
    //let current = formatDate(new Date);
    this.currentDate = formatDate(new Date, 'yyyy-MM-dd','en-US');
    this.formReportVentas.controls.fechaIni.setValue(this.currentDate);
    this.formReportVentas.controls.fechaFin.setValue(this.currentDate);
    this.formReportVentas.controls.unidad.setValue(1);

    console.log("this.currentDate");
    console.log(this.currentDate);

    this.reportesServices.getReportesDiarios(this.currentDate, this.currentDate, this.id_unidad).subscribe(
      (report)=>{
        this.ventas = report;
        console.log(report);

      }
    );
  }

  totalDescuento:number = 0;
  totalIncremento:number = 0;
  cantidadProductos:number = 0;
  totalVenta: number = 0;
  buscarReport(){
    this.fechaInicio = this.formReportVentas.controls.fechaIni.value;
    this.fechaFin = this.formReportVentas.controls.fechaFin.value;
    this.id_unidad = this.formReportVentas.controls.unidad.value;
    this.totalDescuento = 0;
    this.totalIncremento = 0;
    this.cantidadProductos = 0;
    this.totalVenta = 0;

    this.reportesServices.getReportesDiarios(this.fechaInicio, this.fechaFin, this.id_unidad).subscribe(
      (report)=>{
        this.ventas = report;
        console.log("this.ventas");
        console.log(this.ventas);

        if(this.ventas.length > 0 ){
          this.exportar = true;
          for (let i = 0; i < this.ventas.length; i++) {
            this.totalDescuento = this.totalDescuento + this.ventas[i].total_descuento;
            this.totalIncremento = this.totalIncremento + this.ventas[i].total_incremento;
            this.cantidadProductos = this.cantidadProductos + this.ventas[i].cantidad_productos;
            this.totalVenta = this.totalVenta + this.ventas[i].total_venta;
          }
        } else{
          this.exportar =  false;
        }
      }
    );
  }

  exportarExcel(){

    const table = document.getElementById('ventasTable') as HTMLTableSectionElement;
    const wt: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      table
    );

    //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ventas);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wt, 'Libro1');
    XLSX.writeFile(wb, 'Excel1.xlsx');

    /*for (var i in wt) {
      console.log(wt[i]);
      if (typeof wt[i] != 'object') continue;
      let cell = XLSX.utils.decode_cell(i);

      wt[i].s = {
        // styling for all cells
        font: {
          name: 'arial',
        },
        alignment: {
          vertical: 'center',
          horizontal: 'center',
          wrapText: '1', // any truthy value here
        },
        border: {
          right: {
            style: 'thin',
            color: '000000',
          },
          left: {
            style: 'thin',
            color: '000000',
          },
        },
      };

      if (cell.c == 6) {
        // first column
        wt[i].s.numFmt = 'DD-MM-YYYY'; // for dates
        wt[i].z = 'DD-MM-YYYY';
      } else {
        wt[i].s.numFmt = '00'; // other numbers
      }

      if (cell.r == 0) {
        // first row
        wt[i].s.border.bottom = {
          // bottom border
          style: 'thin',
          color: '000000',
        };
      }

      if (cell.r % 2) {
        // every other row
        wt[i].s.fill = {
          // background color
          patternType: 'solid',
          fgColor: { rgb: 'b2b2b2' },
          bgColor: { rgb: 'b2b2b2' },
        };
      }
    }*/
  }

}
