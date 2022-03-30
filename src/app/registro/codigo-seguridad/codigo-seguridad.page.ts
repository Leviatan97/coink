import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CryptoService } from 'src/app/services/crypto.service';
import { GetDataService } from 'src/app/services/get-data.service';
import { format, parseISO } from 'date-fns';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-codigo-seguridad',
  templateUrl: './codigo-seguridad.page.html',
  styleUrls: ['./codigo-seguridad.page.scss'],
})
export class CodigoSeguridadPage implements OnInit {

  telefono: number;
  alert: boolean = false;
  dateValue: string = '';
  dateValue2: string = '';
  form: FormGroup;
  formContra: FormGroup;
  tpDocumento = [];
  tpGenero = [];
  pinIgual = false;
  correoIgual = false;
  formulario = false;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    private getData: GetDataService,
    private router: Router,
    private loadingController: LoadingController,
    private crypto: CryptoService
  ) {
    this.form = this.crearFormulario();
  }


  ngOnInit() {
    this.getData.numeroTelefono != undefined ? 
    this.telefono = this.getData.numeroTelefono : 
    this.router.navigate(['/registro']);
    this.recibirDatos();
  }

  cerrar(): void {
    this.alert = false;
  }

  async recibirDatos(): Promise<void> {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'dots',
      message: 'Por favor, espere...',
    });
    await loading.present();
    
    await this.getData.tipoDocumeto().subscribe(
      async (data) => {
        await this.getData.genero().subscribe(
          (data2) => {
            this.tpDocumento = data;
            this.tpGenero = data2;
            loading.dismiss();
          }
        );
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MM/dd/yyyy');
  }

  crearFormulario() {
    return new FormGroup({
      tdocumento: new FormControl('',[Validators.required]),
      fnacimiento: new FormControl('',[Validators.required,]),
      fexpedicion: new FormControl('',[Validators.required,]),
      genero: new FormControl('',[Validators.required,]),
      ndocumento: new FormControl('',[Validators.required, Validators.min(9999999), Validators.max(9999999999)]),
      email: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern(this.emailPattern)]),
      email2: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern(this.emailPattern)]),
      pin: new FormControl('',[Validators.required]),
      pin2: new FormControl('',[Validators.required ])
     });
  }

  get tdocumento() {
    return this.form.get('tdocumento');
  }

  get fnacimiento() {
    return this.form.get('fnacimiento');
  }

  get fexpedicion() {
    return this.form.get('fexpedicion');
  }

  get genero() {
    return this.form.get('genero');
  }

  get ndocumento() {
    return this.form.get('ndocumento');
  }

  get email() {
    return this.form.get('email');
  }

  get email2() {
    return this.form.get('email2');
  }

  get pin() {
    return this.form.get('pin');
  }

  get pin2() {
    return this.form.get('pin2');
  }

  validarPin(): void {
    this.pinIgual = this.pin.value == this.pin2.value; 
  }

  validarCorreo(): void {
    this.correoIgual = this.email.value == this.email2.value;
  }

  validarFormulario(): boolean {
    if(this.form.valid && this.pinIgual && this.correoIgual) {      
      return false;
    } else {
      return true;
    }
  }

  registrar(): void {
    this.getData.datosRegistro = this.form.value;
    this.router.navigate(['/registro/finalizar']);
  }

}
