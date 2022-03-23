import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  telefono: number;
  numValido: boolean = false;
  numTexto: number;

  constructor(private router: Router, private getData: GetDataService) { }

  ngOnInit() {
  }

  ingresarNumero(numero: number): void {
    !this.telefono ? this.telefono = numero : 
    this.telefono = parseInt(this.telefono.toString() + numero.toString());
    this.telefono.toString().length == 10 ? this.numValido = true : this.numValido = false;
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

  enviarNumero(): void {
    this.getData.numeroTelefono = this.telefono;
    console.log(this.getData.numeroTelefono);
    
    this.router.navigate(['/registro/codigo-seguridad']);
  }

}
