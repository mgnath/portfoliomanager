import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {StockInfo} from '../interfaces/stock-info';

@Injectable()
export class FinanceService {
  private googleFinUrl = 'http://finance.google.com/finance/info?q=';
  private resp =  [
                      {"t" : "AAPL"
                      ,"e" : "NASDAQ"
                      ,"l" : 148.34
                      ,"ltt":"4:00PM EDT"
                      }
                      ,{"t" : "MSFT"
                      ,"e" : "NASDAQ"
                      ,"l" : 65.68
                      ,"ltt":"4:00PM EDT"
                      }
                    ];

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
  getLatestStockPriceMoq():Array<any>{
    return this.resp as Array<any>;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
