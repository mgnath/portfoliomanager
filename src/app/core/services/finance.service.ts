import { Injectable } from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {StockInfo} from '../interfaces/stock-info';

@Injectable()
export class FinanceService {
  private googleFinUrl = 'http://finance.google.com/finance/info?q=';
  private resp =  [{"t" : "AAPL","e" : "NASDAQ","l" : 148.3 ,"ltt":"13:00PM EDT",c_fix:"-0.01",cp_fix:"-0.01" }
                  ,{"t" : "IBM","e" : "NASDAQ","l" : 176.3 ,"ltt":"13:00PM EDT",c_fix:"-2.45",cp_fix:"-1.87" }
                   ,{"t" : "MSFT","e" : "NASDAQ","l" : 65.68,"ltt":"13:00PM EDT",c_fix:"0.09",cp_fix:"0.02"}];

  constructor(private http:Http) { }

   

  getLatestStockPrice(Tickers:string[]):Promise<Array<StockInfo>>{
    let headers = new Headers();
     headers.append("Access-Control-Allow-Origin", "*");
     headers.append("Access-Control-Allow-Headers","Access-Control-Allow-Headers");

    let options = new RequestOptions({headers: headers});

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
