import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskDirective } from 'ngx-mask';
import { ReportesServicesService } from '../../../services/reportes/reportesServices.service';

@Component({
  selector: 'app-salidaComponent',
  templateUrl: './salidaComponent.component.html',
  styleUrls: ['./salidaComponent.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, NgxMaskDirective],
  standalone: true
})
export class SalidaComponentComponent implements OnInit {

  constructor(private reportesServices: ReportesServicesService) { }

  formSalida = new FormGroup({
    id_salida: new FormControl(),
    descripcion_salida: new FormControl(),
    valor_salida: new FormControl(),
    metodo_pago_salida: new FormControl()
  });

  ngOnInit() {
  }

  registrarSalida(){
    console.log(this.formSalida.value);
    //this.reportesServices.insertSalidas().subscribe();
    //insertSalidas
  }

}
