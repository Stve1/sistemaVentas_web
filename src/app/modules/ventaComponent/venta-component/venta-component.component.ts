import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { VentasService } from '../../../services/ventas/ventas.service';

@Component({
  selector: 'app-venta-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule],
  templateUrl: './venta-component.component.html',
  styleUrl: './venta-component.component.css'
})
export class VentaComponentComponent implements OnInit{

  aplicaDescuento:boolean = false;
  repuestos:any = [];
  totalVenta:number = 0;

  formVentas = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    aplicacion: new FormControl(),
    precio: new FormControl(),
    cantidad: new FormControl(),
    descuentoButton: new FormControl(),
    vlrDescuento: new FormControl()
  });

  ngOnInit(): void {
    this.serVentas.getProductos().subscribe(
      pr =>{
        if(pr[0] != undefined){
          this.repuestos = pr;
        }
        console.log("REPUESTOS");
        console.log(this.repuestos);
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
    console.log(this.formVentas.controls.descuentoButton.value)
  }

  carritoCompras:any[]=[];
  datosTabla(prod:any){

    this.formVentas.patchValue({
      id: prod.cod_producto,
      name: prod.nombre_producto,
      aplicacion: prod.aplicacion_productos,
      precio: prod.precio_producto,
      cantidad: 1,
      descuentoButton: false,
      vlrDescuento: 0
    });
  }

  agregarProducto(producto:any){
    const newProduct = {
      id: this.formVentas.controls.id.value,
      name: this.formVentas.controls.name.value,
      modelos: this.formVentas.controls.aplicacion.value,
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
      aplicacion: '',
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
        if(this.carritoCompras[i].descuento == 'S'){
          this.totalVenta = ((this.carritoCompras[i].precio * this.carritoCompras[i].cantidad) - (this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cantidad)) + this.totalVenta;
        } else{
          this.totalVenta = ((this.carritoCompras[i].precio * this.carritoCompras[i].cantidad) +(this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cantidad)) + this.totalVenta;
        }
      }
    } else {
      this.totalVenta = 0;
    }
  }

  totalDescuento:number = 0;
  totalIncremento:number = 0;
  cantProductos:number = 0;
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
          this.totalDescuento = ((this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cantidad)) + this.totalDescuento;
        } else{
          this.totalIncremento = ((this.carritoCompras[i].vlrDescuento * this.carritoCompras[i].cantidad)) + this.totalIncremento;
        }
        this.cantProductos = this.carritoCompras[i].cantidad + this.cantProductos;
      }

      const ventasProductos = {
        total_descuento: this.totalDescuento,
        total_incremento: this.totalIncremento,
        total_venta: this.totalVenta,
        id_cliente: 1,
        cantidad_productos: this.cantProductos
      }

      console.log("ventasProductos");
      console.log(ventasProductos);
      console.log(this.totalDescuento);
      console.log(this.totalIncremento);
      console.log(this.totalVenta);

      this.serVentas.insertVentasTot(ventasProductos).subscribe(
        (res:any) =>{
          if(res > 0){
            for (let v = 0; v < this.carritoCompras.length; v++) {
              const prod = {
                nombre_producto: this.carritoCompras[v].name,
                aplicacion_productos: this.carritoCompras[v].modelos,
                precio_producto: this.carritoCompras[v].precio,
                cant_producto: this.carritoCompras[v].cantidad,
                descuento_producto: this.carritoCompras[v].descuento == 'S' ? this.carritoCompras[v].vlrDescuento : 0,
                incremento_producto :this.carritoCompras[v].descuento == 'S' ? 0 : this.carritoCompras[v].vlrDescuento,
                cod_producto: this.carritoCompras[v].id
              }

              this.serVentas.insertProdVentas(prod).subscribe(
                (rProd) =>{
                  console.log(rProd);
                }
              );

              /*const newProduct = {
                id: this.formVentas.controls.id.value,
                name: this.formVentas.controls.name.value,
                modelos: this.formVentas.controls.aplicacion.value,
                precio: this.formVentas.controls.precio.value,
                cantidad: this.formVentas.controls.cantidad.value,
                descuento: this.formVentas.controls.descuentoButton.value == true ? 'S' : 'N',
                vlrDescuento: this.formVentas.controls.vlrDescuento.value
              }*/

            }
          }
          console.log(res);
        }
      );
    }
    console.log(this.carritoCompras);
  }

}
