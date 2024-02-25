import { Routes } from '@angular/router';
import { MainComponentComponent } from './modules/mainComponent/main-component/main-component.component';
import { VentaComponentComponent } from './modules/ventaComponent/venta-component/venta-component.component';
import { HomeComponentComponent } from './modules/homeComponent/home-component/home-component.component';
import { ReportesComponentComponent } from './modules/reportesComponent/reportes-component/reportes-component.component';
import { ReportesVentaComponentComponent } from './modules/reportesComponent/reportes-venta-component/reportesVentaComponent/reportesVentaComponent.component';

export const routes: Routes = [
  {path: '' , component: MainComponentComponent},
  {path: 'home' , component: HomeComponentComponent},
  {path: 'ventaProductos', component: VentaComponentComponent},
  {path: 'reporteVentas', component: ReportesVentaComponentComponent},
];
