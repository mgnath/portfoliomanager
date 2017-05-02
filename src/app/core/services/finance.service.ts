import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { StockInfo, WatchList } from '../interfaces/stock-info';
import { Observable } from "rxjs/Observable";
import { UtilService } from "app/core/services/util.service";

@Injectable()
export class FinanceService {
  private googleFinUrl = 'http://finance.google.com/finance/info?q=';
  constructor(private http: Http, private util: UtilService) {
  }

  getLatestStockPrice(Tickers: string[]): Observable<Array<StockInfo>> {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.googleFinUrl + Tickers.concat(','))
    .map((response: Response) => JSON.parse(response.text().replace("//", "")));
  }
  getWatchLists(): Array<WatchList> {
    return this.getFromLocalStorage("WatchLists");
  }
  checkIfWatchlistExists(name: string): boolean {
    return this.getFromLocalStorage("WatchLists")
      .filter((ele) => { return (ele.name === name) }).length > 0;
  }
  addWatchList(name: string): void {
    let wl: WatchList = new WatchList();
    wl.id = this.util.generateGUID();
    wl.name = name;
    let col: Array<WatchList> = this.getFromLocalStorage("WatchLists");
    col.push(wl);
    this.saveInLocalStorage("WatchLists", col);
  }
  addTickerToWatchList(ticker:string, watchlist:WatchList ):void{
    if (ticker.length > 0) {
      let newStock = new StockInfo();
      newStock.t = ticker; 
      watchlist.stocklist = watchlist.stocklist || [];
      watchlist.stocklist.push(newStock);
      this.updateWatchList(watchlist);
    }
  }
  updateWatchList(watchList: WatchList): void {
    let old = this.getFromLocalStorage("WatchLists");
    this.saveInLocalStorage("WatchLists", this.getFromLocalStorage("WatchLists")
      .map((ele, idx) => { return (ele.id === watchList.id) ? watchList : ele; }));
  }
  private saveInLocalStorage(collectionKey: string, object: Array<WatchList>) {
    localStorage.setItem(collectionKey, JSON.stringify(object));
  }
  private getFromLocalStorage(collectionKey: string): Array<WatchList> {
    return JSON.parse(localStorage.getItem(collectionKey)) || new Array<WatchList>();
  }
}
