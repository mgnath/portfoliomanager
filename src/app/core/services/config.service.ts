import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  static FIN_URL:string  = "http://finance.google.com/finance/info?q=";
  static REFRESH_RATE = 60000; 
  static AUTH0_KEY = "6kJ-raPDH1s9dUEFd9-O3nJGhM-yPkY5";
  static AUTH0_URL = 'pulihorasecurity.auth0.com';

  // static AUTH0_KEY = "RHu18RAQxkq1aGldT7Yb0i08ufuOBjBS";
  // static AUTH0_URL = 'neosecu.auth0.com';
  constructor() { }

}

//  static AUTH0_KEY = "kK88z3bP5ULbT1xm4tK5y9qmcAF2PaIb";
//   static AUTH0_URL = 'security-pulihora.auth0.com';


// static AUTH0_KEY = "RHu18RAQxkq1aGldT7Yb0i08ufuOBjBS";
//   static AUTH0_URL = 'neosecu.auth0.com';
