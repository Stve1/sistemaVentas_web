import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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

  totalVenta:number = 0;

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
    this.totalVenta = 0;
    this.carritoCompras.push(newProduct);

    if(this.carritoCompras.length > 0){
      for(let i = 0; i < this.carritoCompras.length; i++){
        if(this.carritoCompras[i].descuento == 'S'){
          this.totalVenta = ((this.carritoCompras[i].precio * this.carritoCompras[i].cantidad) - (this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cantidad)) + this.totalVenta;
        } else{
          this.totalVenta = ((this.carritoCompras[i].precio * this.carritoCompras[i].cantidad) +(this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cantidad)) + this.totalVenta;
        }
      }
    } else {
      this.totalVenta = 0;
    }

    this.closModalProd();

  }

  modalProducto(contenido: any, prod: any){
    this._modal.open(contenido, {size: 'xl'});
    this.datosTabla(prod);
  }

  closModalProd(){
    this.limpiarForm();
    this._modal.dismissAll();
  }

  limpiarForm(){
    this.formVentas.patchValue({
      id: 0,
      name: '',
      precio: 0,
      cantidad: 0,
      descuentoButton: false,
      vlrDescuento: 0
    });
  }

  eliminarProducto(producto:any){
    this.totalVenta = 0;
    this.carritoCompras = this.carritoCompras.filter((p) =>  producto.id != p.id);
    if(this.carritoCompras.length > 0){
      for(let i = 0; i < this.carritoCompras.length; i++){
        this.totalVenta = (this.carritoCompras[i].precio * this.carritoCompras[i].cantidad)
      }
    } else{
      this.totalVenta = 0;
    }
  }

  enviarProductos(){
    if(this.carritoCompras.length < 1){
      Swal.fire({
        title: 'Debe agregar algún producto.',
        confirmButtonColor: '#ec5353',
        icon: 'error'
      })
    }
    console.log(this.carritoCompras);
  }

}
