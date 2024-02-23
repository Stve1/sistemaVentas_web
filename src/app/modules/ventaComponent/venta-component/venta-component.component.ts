import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { VentasService } from '../../../services/ventas/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-venta-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, NgxMaskDirective],
  templateUrl: './venta-component.component.html',
  styleUrl: './venta-component.component.css'
})
export class VentaComponentComponent implements OnInit{

  formVentas = new FormGroup({
    id_producto: new FormControl(),
    nombre_producto: new FormControl(),
    aplicacion_productos: new FormControl(),
    costo_producto: new FormControl(),
    precio_producto: new FormControl(),
    cant_producto: new FormControl(),
    cod_producto: new FormControl(),
    descuentoButton: new FormControl(),
    vlrDescuento: new FormControl(),
    costo2_producto: new FormControl(),
    precio2_producto: new FormControl()
  });

  aplicaDescuento:boolean = false;
  carritoCompras:any[]=[];
  repuestos:any = [];
  totalVenta:number = 0;

  ngOnInit(): void {
    this.serVentas.getProductos().subscribe(
      pr =>{
        if(pr[0] != undefined){
          this.repuestos = pr;
        }
      }
    );
  }

  constructor(private _modal:NgbModal, private serVentas: VentasService){}

  haveDiscount(){
    if(this.formVentas.controls.descuentoButton.value == true){
      this.aplicaDescuento = true;
    } else {
      this.aplicaDescuento = false;
    }
  }

  precioProducto:number = 0;
  datosTabla(prod:any){
    if(prod.precio2_producto > prod.precio_producto){
      this.precioProducto = prod.precio2_producto;
    } else if(prod.precio_producto > prod.precio2_producto){
      this.precioProducto = prod.precio_producto;
    }

    this.formVentas.patchValue({
      id_producto: prod.cod_producto,
      nombre_producto: prod.nombre_producto,
      aplicacion_productos: prod.aplicacion_productos,
      costo_producto: prod.costo_producto,
      precio_producto: this.precioProducto,
      cant_producto: 1,
      cod_producto: prod.cod_producto,
      descuentoButton: false,
      vlrDescuento: 0,
      costo2_producto: prod.costo2_producto,
      precio2_producto: prod.precio2_producto
    });
  }

  agregarProducto(){
    const newProduct = {
      id_producto: this.formVentas.controls.id_producto.value,
      nombre_producto: this.formVentas.controls.nombre_producto.value,
      aplicacion_productos: this.formVentas.controls.aplicacion_productos.value,
      costo_producto: this.formVentas.controls.costo_producto.value,
      precio_producto: this.formVentas.controls.precio_producto.value,
      cant_producto: this.formVentas.controls.cant_producto.value,
      cod_producto: this.formVentas.controls.cod_producto.value,
      descuento: this.formVentas.controls.descuentoButton.value == true ? 'S' : 'N',
      vlrDescuento: this.formVentas.controls.vlrDescuento.value,
      costo2_producto: this.formVentas.controls.costo2_producto.value,
      precio2_producto: this.formVentas.controls.precio2_producto.value
    }

    console.log("NEW PRODUCT");
    console.log(newProduct);
    this.totalVenta = 0;
    this.carritoCompras.push(newProduct);

    if(this.carritoCompras.length > 0){
      for(let i = 0; i < this.carritoCompras.length; i++){
        if(this.carritoCompras[i].descuento == 'S'){
          this.totalVenta = ((this.carritoCompras[i].precio_producto * this.carritoCompras[i].cant_producto) - (this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cant_producto)) + this.totalVenta;
        } else{
          this.totalVenta = ((this.carritoCompras[i].precio_producto * this.carritoCompras[i].cant_producto) + (this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cant_producto)) + this.totalVenta;
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
      id_producto: 0,
      nombre_producto: '',
      aplicacion_productos: '',
      costo_producto: 0,
      precio_producto: 0,
      cant_producto: 0,
      cod_producto: 0,
      descuentoButton: false,
      vlrDescuento: 0,
      costo2_producto: 0,
      precio2_producto: 0
    });
  }

  eliminarProducto(producto:any){
    this.totalVenta = 0;
    this.carritoCompras = this.carritoCompras.filter((p) =>  producto.id != p.id);

    if(this.carritoCompras.length > 0){
      for(let i = 0; i < this.carritoCompras.length; i++){
        if(this.carritoCompras[i].descuento == 'S'){
          this.totalVenta = ((this.carritoCompras[i].precio_producto * this.carritoCompras[i].cant_producto) - (this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cant_producto)) + this.totalVenta;
        } else{
          this.totalVenta = ((this.carritoCompras[i].precio_producto * this.carritoCompras[i].cant_producto) + (this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cant_producto)) + this.totalVenta;
        }
      }
    } else {
      this.totalVenta = 0;
    }
  }

  totalDescuento:number = 0;
  totalIncremento:number = 0;
  cantProductos:number = 0;
  countProducts: number = 0;
  enviarProductos(){
    this.totalDescuento = 0;
    this.totalIncremento = 0;
    this.cantProductos = 0;

    if(this.carritoCompras.length < 1){
      Swal.fire({
        title: 'Debe agregar algún producto.',
        confirmButtonColor: '#ec5353',
        icon: 'error'
      })
    } else{
      for (let i = 0; i < this.carritoCompras.length; i++) {
        if(this.carritoCompras[i].descuento == 'S'){
          this.totalDescuento = ((this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cant_producto)) + this.totalDescuento;
        } else{
          this.totalIncremento = ((this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cant_producto)) + this.totalIncremento;
        }
        this.cantProductos = this.carritoCompras[i].cant_producto + this.cantProductos;
      }

      const ventasProductos = {
        total_descuento: this.totalDescuento,
        total_incremento: this.totalIncremento,
        total_venta: this.totalVenta,
        id_cliente: 1,
        cantidad_productos: this.cantProductos
      }

      console.log("VENTA");
      console.log(ventasProductos);

      this.serVentas.insertVentasTot(ventasProductos).subscribe(
        (res:any) =>{
          if(res > 0){
            console.log(res);

            for (let v = 0; v < this.carritoCompras.length; v++) {
              const prod = {
                nombre_producto: this.carritoCompras[v].nombre_producto,
                aplicacion_productos: this.carritoCompras[v].aplicacion_productos,
                precio_producto: this.carritoCompras[v].precio_producto,
                cant_producto: this.carritoCompras[v].cant_producto,
                descuento_producto: this.carritoCompras[v].descuento == 'S' ? this.carritoCompras[v].vlrDescuento : 0,
                incremento_producto :this.carritoCompras[v].descuento == 'S' ? 0 : this.carritoCompras[v].vlrDescuento,
                cod_producto: this.carritoCompras[v].cod_producto
              }

              console.log("Productos");
              console.log(prod);

              this.serVentas.insertProdVentas(prod).subscribe((rProd:any) =>{
                  console.log(rProd);
                  if(rProd > 0){
                    this.countProducts = this.countProducts + 1;
                  }
                }
              );
            }
          }
        }
      );
    }
    console.log(this.carritoCompras);
  }

}
