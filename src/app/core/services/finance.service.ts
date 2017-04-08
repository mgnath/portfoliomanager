import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {StockInfo} from '../interfaces/stock-info';

@Injectable()
export class FinanceService {
  private googleFinUrl = 'http://finance.google.com/finance/info?q=';
  
  constructor(private http:Http) { }
  getLatestStockPrice(Tickers:string[]):Promise<Array<StockInfo>>{
    return this.http
      .get(this.googleFinUrl+Tickers.concat(','))
      .toPromise()
      .then((response)=>{
        return JSON.parse(response.text().replace("//",""));
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
