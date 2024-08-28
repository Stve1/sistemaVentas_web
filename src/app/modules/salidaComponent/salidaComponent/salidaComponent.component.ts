import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskDirective } from 'ngx-mask';
import { ReportesServicesService } from '../../../services/reportes/reportesServices.service';
import { VentasService } from '../../../services/ventas/ventas.service';
import { beMetodos } from '../../../models/beMetodos';

@Component({
  selector: 'app-salidaComponent',
  templateUrl: './salidaComponent.component.html',
  styleUrls: ['./salidaComponent.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, NgxMaskDirective],
  standalone: true
})
export class SalidaComponentComponent implements OnInit {

  constructor(
    private reportesServices: ReportesServicesService,
    private serVentas: VentasService
    ) { }

  formSalida = new FormGroup({
    id_salida: new FormControl(),
    descripcion_salida: new FormControl(),
    valor_salida: new FormControl(),
    metodo_pago_salida: new FormControl()
  });

  metodosPagos: beMetodos[] = [];
  descripcionSalida: string = "";
  valorSalida:number = 0;
  metodoPagoSalida: number = 0;

  ngOnInit() {
    this.metodosPagos = [];
    this.serVentas.getMetodosPago().subscribe(
      (mp: beMetodos[])=>{
        console.log("mp");
        console.log(mp);
        this.metodosPagos = mp;
        this.formSalida.controls['metodo_pago_salida'].setValue(1);
      }
    );
  }

  registrarSalida(){
    this.descripcionSalida = "";
    this.valorSalida = 0;
    this.metodoPagoSalida = 0;
    console.log(this.formSalida.value);
    this.descripcionSalida = this.formSalida.controls['descripcion_salida'].value;
    this.valorSalida = this.formSalida.controls['valor_salida'].value;
    this.metodoPagoSalida = parseInt(this.formSalida.controls['metodo_pago_salida'].value);

    console.log(this.metodoPagoSalida);

    console.log("DESCRIPCION SALIDA");
    console.log(this.descripcionSalida);
    console.log(this.valorSalida);
    console.log(this.metodoPagoSalida);

    const bdSalida = {
      descripcion_salida: this.descripcionSalida,
      valor_salida: this.valorSalida,
      metodo_pago: this.metodoPagoSalida
    }

    if(this.descripcionSalida != "" && this.valorSalida != 0 && this.metodoPagoSalida != 0){


      this.reportesServices.insertSalidas(bdSalida).subscribe(
        (rS:any)=>{
          console.log("RESPUESTA SALIDA");
          console.log(rS);
        }
      );

    }
    //insertSalidas
  }

}
