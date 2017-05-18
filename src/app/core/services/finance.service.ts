import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';

import { Quote, WatchList, StockInfo } from '../interfaces/stock-info';
import { Observable } from "rxjs/Observable";
import { UtilService } from "app/core/services/util.service";

@Injectable()
export class FinanceService {
  private googleFinUrl = 'http://finance.google.com/finance/info?JSONP_CALLBACK&q=';
  constructor(private jsonp: Jsonp, private util: UtilService) {
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
      newStock.stake = 9;
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
  deleteWatchList(watchList: WatchList): void {
    let old = this.getFromLocalStorage("WatchLists");
    this.saveInLocalStorage("WatchLists", this.getFromLocalStorage("WatchLists")
      .filter((ele) => ele.id !== watchList.id));
  }
  private saveInLocalStorage(collectionKey: string, object: Array<WatchList>) {
    localStorage.setItem(collectionKey, JSON.stringify(object));
  }
  private getFromLocalStorage(collectionKey: string): Array<WatchList> {
    return JSON.parse(localStorage.getItem(collectionKey)) || new Array<WatchList>();
  }
}



  // getLatestStockPrice(Tickers: string[]): Observable<Array<StockInfo>> {
  //     // let headers = new Headers();
  //     // headers.append("Access-Control-Allow-Origin", "http://127.0.0.1:4200");
  //     // //headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");

  //     // let options = new RequestOptions({ headers: headers });

  //   return this.jsonp.get(this.googleFinUrl + Tickers.concat(','))
  //   .map((response: Response) => JSON.parse(response.text().replace("//", "")));
  // }