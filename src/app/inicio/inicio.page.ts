import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private getData: GetDataService, private router: Router) { }

  ngOnInit() {
    this.getData.numeroTelefono != undefined && this.getData.datosRegistro != undefined ?
    this.imprimir() :
    this.router.navigate(['/home']);
  }

  iniciar(): void {
    this.router.navigate(['/home']);
  }

  imprimir(): void {
    console.log(this.getData.datosRegistro);
    console.log(this.getData.numeroTelefono);
  }

}
