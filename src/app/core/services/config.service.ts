import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  static FIN_URL:string  = "http://finance.google.com/finance/info?q=";
  static REFRESH_RATE = 60000; 
  static AUTH0_KEY = "RHu18RAQxkq1aGldT7Yb0i08ufuOBjBS";
  static AUTH0_URL = 'neosecu.auth0.com';
  constructor() { }

}
