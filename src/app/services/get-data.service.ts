import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  public numeroTelefono: number;

  constructor(private http: HttpClient, private crypto: CryptoService) { }

  codigoTelefonico(data): any {    
    return this.http.post('https://api.bancoink.biz/qa/signup/sendSmsVerificationNumber?apiKey=030106', {payload:data});
  }
}
