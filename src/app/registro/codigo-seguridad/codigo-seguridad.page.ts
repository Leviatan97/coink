import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CryptoService } from 'src/app/services/crypto.service';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-codigo-seguridad',
  templateUrl: './codigo-seguridad.page.html',
  styleUrls: ['./codigo-seguridad.page.scss'],
})
export class CodigoSeguridadPage implements OnInit {

  numTexto: string;
  telefono: number;
  alert: boolean = false;

  constructor(
    private getData: GetDataService,
    private router: Router,
    private loadingController: LoadingController,
    private crypto: CryptoService
  ) { }


  ngOnInit() {
    this.getData.numeroTelefono != undefined ? 
    this.telefono = this.getData.numeroTelefono : 
    this.router.navigate(['/registro']); 
  }

  cerrar(): void {
    this.alert = false;
  }

  ingresarNumeroTexto(numero: number): void {
    !this.numTexto ? this.numTexto = numero.toString() : 
    this.numTexto = this.numTexto.toString() + numero.toString();
    this.numTexto.toString().length == 4 ? this.validarCodigo() : console.log('numero invalido');
    this.numTexto.toString().length > 4 ? this.numTexto = undefined : null;
  }

  borrarNumeroTexto(): void {
    if(this.numTexto != undefined) {
      const longitud = this.numTexto.toString().length - 1;
      this.numTexto = this.numTexto.toString().substring(0, longitud);
      !this.numTexto ? this.numTexto = undefined : null;
    }
  }

  async validarCodigo(): Promise<void> {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'dots',
      message: 'Por favor, espere...',
    });
    await loading.present();
    const codigo = this.crypto.encrypt(JSON.stringify({phone_number:this.telefono.toString(),log_signup_id:""}), '030106');
    console.log(JSON.stringify({phone_number:this.telefono.toString(),log_signup_id:""}));
    
    await this.getData.codigoTelefonico(codigo).subscribe((data: any) => {
      // if(data.status == 'success') {
      //   this.router.navigate(['/registro/confirmar-codigo']);
      // } else {
      //   this.alert = true;

      // }
      // loading.dismiss();
      console.log(data);
      
    });
    
    // this.alert = true;
  }

  // async presentLoadingWithOptions() {
    

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed with role:', role);
  // }

}
