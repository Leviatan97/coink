import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  telefono: number;
  numValido: boolean = false;
  msgTexto: boolean = false;
  numTexto: number;

  constructor() { }

  ngOnInit() {
  }

  ingresarNumero(numero: number): void {
    !this.telefono ? this.telefono = numero : 
    this.telefono = parseInt(this.telefono.toString() + numero.toString());
    this.telefono.toString().length == 10 ? this.numValido = true : this.numValido = false;
  }

  ingresarNumeroTexto(numero: number): void {
    !this.numTexto ? this.numTexto = numero : 
    this.numTexto = parseInt(this.numTexto.toString() + numero.toString());
    this.numTexto.toString().length == 4 ? console.log('numero valido') : console.log('numero invalido');
  }

  borrarNumero(): void {
    if (this.telefono != undefined) {
      const longitud = this.telefono.toString().length - 1;
      this.telefono = parseInt(this.telefono.toString().substring(0, longitud));
    }
    isNaN(this.telefono) ? this.telefono = undefined :
    this.telefono.toString().length == 10 ? this.numValido = true :
    this.numValido = false;
  }

  borrarNumeroTexto(): void {
    const longitud = this.numTexto.toString().length - 1;
    this.numTexto = parseInt(this.numTexto.toString().substring(0, longitud));
    isNaN(this.numTexto) ? this.numTexto = undefined : null;
  }

  enviarNumero(): void {
    this.msgTexto = true;
  }

}
