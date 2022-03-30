import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  public numeroTelefono: number;
  public datosRegistro: any;

  constructor(private http: HttpClient, private crypto: CryptoService) { }

  tipoDocumeto(): any {    
    return this.http.get('https://api.bancoink.biz/qa/signup/documentTypes?apiKey=030106');
  }

  genero(): any {
    return this.http.get('https://api.bancoink.biz/qa/signup/genders?apiKey=030106');
  }
}
