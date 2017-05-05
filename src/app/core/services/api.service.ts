import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

import { StockInfo, WatchList } from '../interfaces/stock-info';
import { Observable } from "rxjs/Observable";
@Injectable()
export class ApiService {

  private googleFinUrl = 'http://finance.google.com/finance/info?q=';
  constructor(private http: Http) {
  }
  getLatestStockPrice(Tickers: string[]): Observable<Array<StockInfo>> {
    $.ajax({
        url: 'http://finance.google.com/finance/info?q=AAPL&callback=success',
        success: function (data, status) {
            console.log(data);
        },
        error: function (xOptions, textStatus) {
            console.log("err");
        }
    });

    return this.http.get(this.googleFinUrl + Tickers.concat(',')) //+"&callback="
      .map((response: Response) => JSON.parse(response.text().replace("//", "")));
  }
}


//  var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//         // Typical action to be performed when the document is ready:
//         console.log(xhttp.responseText);
//       }
//     };
//     xhttp.open("GET", "http://www.omdbapi.com/?t=The&y=2000", true);
//     xhttp.send();