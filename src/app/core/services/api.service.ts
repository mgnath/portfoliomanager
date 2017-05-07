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
        return this.http.get(this.googleFinUrl + Tickers.concat(','))
            .map((response: Response) => JSON.parse(response.text().replace("//", "")));
    }
    GetJsonPResponse(Tickers: string[], callback) {
        var apiServicePath = this.googleFinUrl + Tickers.concat(',');
        $.ajax({
            crossDomain: true,
            dataType: "jsonp",
            url: apiServicePath,
            async: false,
        }).done(function (data) {
            callback(data);
        });
    };
}