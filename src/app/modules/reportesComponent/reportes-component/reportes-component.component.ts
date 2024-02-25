import { Component, OnInit } from '@angular/core';
import { ReportesServicesService } from '../../../services/reportes/reportesServices.service';

@Component({
  selector: 'app-reportes-component',
  standalone: true,
  imports: [],
  templateUrl: './reportes-component.component.html',
  styleUrl: './reportes-component.component.css'
})
export class ReportesComponentComponent implements OnInit{
  constructor(private reportesServices: ReportesServicesService){}
  ngOnInit(): void {
    console.log("ON INIT");
  }

}
