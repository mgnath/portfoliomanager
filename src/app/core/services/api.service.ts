import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

import { StockInfo, WatchList } from '../interfaces/stock-info';
import { Observable } from "rxjs/Observable";
import { ConfigService } from "app/core/services/config.service";
@Injectable()
export class ApiService {

    constructor(private http: Http, private config: ConfigService) {
    }
    getLatestStockPrice(Tickers: string[]): Observable<Array<StockInfo>> {
        return this.http.get(ConfigService.FIN_URL + Tickers.concat(',')) //+"&callback="
            .map((response: Response) => JSON.parse(response.text().replace("//", "")));
    }
    GetJsonPResponse(Tickers: string[], callback) {
        var apiServicePath = ConfigService.FIN_URL + Tickers.concat(',');
        $.ajax({
            crossDomain: true,
            dataType: "jsonp",
            url: apiServicePath,
            async: false,
            context: document.body
        }).done(function (data) {
            callback(data);
        });
    };
}
