import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  static FIN_URL:string  = "http://finance.google.com/finance/info?q=";
  static REFRESH_RATE = 60000; 

  constructor() { }

}
