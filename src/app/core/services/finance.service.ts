import { Injectable } from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { StockInfo, WatchList } from '../interfaces/stock-info';
import { Observable } from "rxjs/Observable";
import { UtilService } from "app/core/services/util.service";

@Injectable()
export class FinanceService {
  private googleFinUrl = 'http://finance.google.com/finance/info?q=';
  private wls:Array<WatchList> = [];
  constructor(private http:Http, private util:UtilService) {
    let temp:WatchList = new WatchList();
    temp.name = "mydefault";
    temp.stocklist = [];
    let st:StockInfo = new StockInfo();
    st.t = "AAPL";
    temp.stocklist.push(st);
    this.wls.push(temp);
   }

  getLatestStockPrice(Tickers:string[]):Observable<Array<StockInfo>>{
    let headers = new Headers();
     headers.append("Access-Control-Allow-Origin", "*");
     headers.append("Access-Control-Allow-Headers","Access-Control-Allow-Headers");

    let options = new RequestOptions({headers: headers});

    return this.http.get(this.googleFinUrl+Tickers.concat(','))
    .map((response:Response) => JSON.parse(response.text().replace("//","")));
  }
  getWatchLists(): Array<WatchList>{
    return this.getFromLocalStorage("WatchLists");
  }
  addWatchList(name:string):void{
    let wl:WatchList = new WatchList();
    wl.id = this.util.generateGUID();
    wl.name = name;
    let col:Array<WatchList> = this.getFromLocalStorage("WatchLists");
    col.push(wl);
    this.saveInLocalStorage("WatchLists", col);
  }
  updateWatchList(watchList:WatchList):void{
    let old = this.getFromLocalStorage("WatchLists");
    this.saveInLocalStorage("WatchLists",this.getFromLocalStorage("WatchLists")
            .map((ele,idx)=>{ return (ele.id === watchList.id)? watchList: ele;}));
  }
  private saveInLocalStorage(collectionKey:string, object: Array<WatchList> ){
    localStorage.setItem(collectionKey, JSON.stringify(object));
  }
  private getFromLocalStorage(collectionKey:string):Array<WatchList>{
    return JSON.parse(localStorage.getItem(collectionKey)) || new Array<WatchList>();
  }
}


// getLatestStockPriceMoq():Array<any>{
//     return this.resp as Array<any>;
//   }

// private resp =  [{"t" : "AAPL","e" : "NASDAQ","l" : 148.3 ,"ltt":"13:00PM EDT",c_fix:"-0.01",cp_fix:"-0.01" }
//                   ,{"t" : "IBM","e" : "NASDAQ","l" : 176.3 ,"ltt":"13:00PM EDT",c_fix:"-2.45",cp_fix:"-1.87" }
//                    ,{"t" : "MSFT","e" : "NASDAQ","l" : 65.68,"ltt":"13:00PM EDT",c_fix:"0.09",cp_fix:"0.02"}];
