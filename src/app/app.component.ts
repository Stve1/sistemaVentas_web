import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponentComponent } from './modules/homeComponent/home-component/home-component.component';
import { MenuComponentComponent } from './modules/menuComponent/menu-component/menu-component.component';
import { } from '@angular/material';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistemaVentaV1';
}
