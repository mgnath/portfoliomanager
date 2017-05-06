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
    this.GetJsonPResponse(Tickers);

    return this.http.get(this.googleFinUrl + Tickers.concat(',')) //+"&callback="
      .map((response: Response) => JSON.parse(response.text().replace("//", "")));
  }
   GetJsonPResponse(Tickers: string[]) {    
        var apiServicePath = this.googleFinUrl + Tickers.concat(',');    
        $.ajax({    
            crossDomain: true,    
            dataType: "jsonp",    
            url: apiServicePath,    
            async: false,    
            context: document.body    
        }).done(function (data) {    
            console.log(data);    
        });    
    };    
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