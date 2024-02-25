import { Component, OnInit } from '@angular/core';
import { ReportesServicesService } from '../../../../services/reportes/reportesServices.service';

@Component({
  selector: 'app-reportesVentaComponent',
  imports:[],
  standalone: true,
  templateUrl: './reportesVentaComponent.component.html',
  styleUrls: ['./reportesVentaComponent.component.css'],

})
export class ReportesVentaComponentComponent implements OnInit {

  constructor(private reportesServices: ReportesServicesService) { }

  ngOnInit() {
    this.reportesServices.getReportesDiarios().subscribe(
      (report)=>{
        console.log(report);
      }
    );
  }

}
