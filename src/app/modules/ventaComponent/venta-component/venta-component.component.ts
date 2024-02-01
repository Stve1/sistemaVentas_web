import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-venta-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule],
  templateUrl: './venta-component.component.html',
  styleUrl: './venta-component.component.css'
})
export class VentaComponentComponent implements OnInit{
  ngOnInit(): void {
    console.log("NG ONNIT")
  }

  formVentas = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    precio: new FormControl(),
    cantidad: new FormControl(),
    descuentoButton: new FormControl(),
    vlrDescuento: new FormControl()
  });

  aplicaDescuento:boolean = false;

  repuestos:any = [
    {
      id: 1,
      name: 'Pastillas freno',
      descripcion: 'Delantero',
      modelo: 'NKD 125',
      precio: 25000
    },
    {
      id: 2,
      name: 'Bandas freno',
      descripcion: 'Trasero',
      modelo: 'NKD 125',
      precio: 35000
    },
  ]

  constructor(private _modal:NgbModal){}

  haveDiscount(){
    if(this.formVentas.controls.descuentoButton.value == true){
      this.aplicaDescuento = true;
    } else {
      this.aplicaDescuento = false;
    }
    console.log(this.formVentas.controls.descuentoButton.value)
  }

  carritoCompras:any[]=[];
  datosTabla(prod:any){

    this.formVentas.patchValue({
      id: prod.id,
      name: prod.name,
      precio: prod.precio,
      cantidad: 1,
      descuentoButton: false,
      vlrDescuento: 0
    });
  }

  agregarProducto(producto:any){
    const newProduct = {
      id: this.formVentas.controls.id.value,
      name: this.formVentas.controls.name.value,
      precio: this.formVentas.controls.precio.value,
      cantidad: this.formVentas.controls.cantidad.value,
      descuento: this.formVentas.controls.descuentoButton.value == true ? 'S' : 'N',
      vlrDescuento: this.formVentas.controls.vlrDescuento.value
    }

    console.log("NEW PRODUCT");
    console.log(newProduct);
    this.carritoCompras.push(newProduct);

    this.closModalProd();

  }

  modalProducto(contenido: any, prod: any){
    this._modal.open(contenido, {size: 'xl'});
    this.datosTabla(prod);
  }

  closModalProd(){
    this._modal.dismissAll();
  }

  eliminarProducto(producto:any){
    this.carritoCompras = this.carritoCompras.filter((p) =>  producto.id != p.id);
  }

  enviarProductos(){
    console.log(this.carritoCompras);
  }

}
