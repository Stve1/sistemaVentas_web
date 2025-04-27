import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { VentasService } from '../../../services/ventas/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective } from 'ngx-mask';
import { beProductos } from '../../../models/beProductos';

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
    vlrDescuento: new FormControl()
  });

  aplicaDescuento:boolean = false;
  carritoCompras:any[]=[];
  repuestos:beProductos[] = [];
  repuestos2: beProductos[] = [];
  totalVenta:number = 0;

  ngOnInit(): void {
    this.serVentas.getProductos().subscribe(
      pr =>{
        if(pr?.code > 0){
          switch(pr?.code){
            case 200:
              this.repuestos = pr?.message;
              this.repuestos2 = pr?.message;
              console.log("pr.message");
              console.log(pr.message);
              break;

              case 204:
                break;

              case 400:
                break;

              default:
                console.log("default");
                console.log(pr?.message);
                break;
          }
        } else{

        }

      }, (error)=>{
        console.log("ERROR");
        console.log(error);
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
  datosTabla(prod:beProductos){
    console.log("prod");
    console.log(prod);

    this.precioProducto = this.validaPrecio(prod);
    this.formVentas.patchValue({
      id_producto: prod.id_producto,
      nombre_producto: prod.nombre_producto,
      aplicacion_productos: prod.aplicacion_productos,
      costo_producto: prod.beCosto[0].costo_producto,
      precio_producto: this.precioProducto,
      cant_producto: 1,
      cod_producto: prod.cod_producto,
      descuentoButton: false,
      vlrDescuento: 0,
    });
  }

  agregarProducto(){
    var d = 0;
    console.log("this.carritoCompras");
    console.log(this.carritoCompras);
    if(this.carritoCompras?.length > 0){
      console.log("FIND");
      for (let i = 0; i < this.carritoCompras?.length; i++) {
        this.carritoCompras[i].id = i;
        d = (i + 1 < this.carritoCompras?.length ? i : i + 1);
      }

    } else{
      d = 0;
    }

    const newProduct = {
      id: d,
      id_producto: this.formVentas.controls.id_producto.value,
      nombre_producto: this.formVentas.controls.nombre_producto.value,
      aplicacion_productos: this.formVentas.controls.aplicacion_productos.value,
      costo_producto: this.formVentas.controls.costo_producto.value,
      precio_producto: this.formVentas.controls.precio_producto.value,
      cant_producto: this.formVentas.controls.cant_producto.value,
      cod_producto: this.formVentas.controls.cod_producto.value,
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
      vlrDescuento: 0
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

  arreglo:any = {
  }

  async enviarProductos(){
    this.totalDescuento = 0;
    this.totalIncremento = 0;
    this.cantProductos = 0;

    this.arreglo = {
      1: "Efectivo",
      2: "Nequi",
      3: "Daviplata",
      4: "Bancolombia",
    }

    /*
    "1": "Efectivo",
    "2": "Nequi",
    "3": "Daviplata",
    "4": "Daviplata"
    */

    if(this.carritoCompras.length < 1){
      Swal.fire({
        title: 'Debe agregar algún producto.',
        confirmButtonColor: '#ec5353',
        icon: 'error'
      });
    } else{
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            "1": "Efectivo",
            "2": "Nequi",
            "3": "Daviplata",
            "4": "Bancolombia"
          });
        }, 500);
      });
      const { value: metodo } = await Swal.fire({
        title: "Seleccione el método de pago.",
        input: "radio",
        inputOptions,
        confirmButtonColor: "#0000FF",
        allowEscapeKey: false,
        allowOutsideClick: false,
        inputValidator: (value):any => {
          if (!value) {
            return "Seleccione el método de pago!";
          }
        }
      });

      if(metodo || metodo != undefined){
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
          cantidad_productos: this.cantProductos,
          metodo_pago: parseInt(metodo)
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
                      if(this.countProducts == this.carritoCompras.length){
                        Swal.fire({
                          title: 'Venta registrada.',
                          showConfirmButton: false,
                          icon: 'success',
                          timer: 2000
                        }).then((result) =>{
                          if(result.isDismissed){
                            console.log(result.isDismissed);
                            window.location.reload();
                          }
                          //window.location.reload();
                        });
                      }
                    }
                  }
                );
              }
            }
          }
        );
      }
      console.log("metodo----");
      console.log(metodo);
    }
    console.log(this.carritoCompras);
  }

  srch(ip:any){
    var val = ip?.value.toLowerCase();
    this.repuestos = this.repuestos2;
    var c = this.repuestos?.filter(
      function(p:any){
        if(p?.cod_producto?.toString().includes(val) || p?.aplicacion_productos?.toLowerCase().trim().includes(val) ||
          p?.nombre_producto?.toLowerCase().trim().includes(val)
        ){
          return p;
        } else{
        }
      }
    );

    this.repuestos = c;
  }

  validaPrecio(prod: beProductos){
    var p = prod.bePrecio.find((p)=> Math.max(p.precio_producto));
    var precio = 0;
    if(p){
      precio = p.precio_producto;

    } else{

    }
    return precio;
  }

}
