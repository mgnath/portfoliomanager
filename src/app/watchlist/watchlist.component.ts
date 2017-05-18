import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WatchList, Quote, StockInfo } from "app/core/interfaces/stock-info";
import { FinanceService } from "app/core/services/finance.service";
import { Observable, Subscription } from "rxjs/Rx";
import { ApiService } from "app/core/services/api.service";

@Component({
  selector: 'pm-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  @Input() watchlist: WatchList;
  @Input() auto: boolean;
  @Input() deletable: boolean;
  @Output()
  delete: EventEmitter<WatchList> = new EventEmitter<WatchList>();

  stream: Observable<number>;
  subscription: Subscription;

  newWLTicker: string;
  constructor(private financeService: FinanceService, private apiService: ApiService) {
    this.stream = Observable.interval(30000);
  }

  ngOnInit() {
    this.refreshWLData();
    this.toggleAuto(this.auto);
  }
  deleteWL() {
    this.delete.emit(this.watchlist);
  }
  toggleAuto(enable: Boolean) {
    if (enable) {
      this.subscription = this.stream.subscribe((x) => {
        this.refreshWLData();
      });
    }
    else {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }
  addTickerToWL() {
    if (this.newWLTicker && this.newWLTicker.length > 0) {
      this.financeService.addTickerToWatchList(this.newWLTicker, this.watchlist);
      this.newWLTicker = "";
      this.refreshWLData();
    }
  }
  getTotal(){
    let indTotals = this.watchlist.stocklist.map(x=> x.l*x.stake );
    let total = 0;
    indTotals.forEach(
      e => total += e
    );
    return total;
  }
  refreshWLData() {
    //console.log(this.watchlist.stocklist[0].stake);
    if (this.watchlist.stocklist && this.watchlist.stocklist.length > 0) {
      // this.apiService.getLatestStockPrice(this.watchlist.stocklist.map(e => e.t))
      //   .subscribe(stockInfo => this.watchlist.stocklist = stockInfo);
      this.apiService.GetJsonPResponse(this.watchlist.stocklist.map(e => e.t),
        (quote: Array<Quote>) => {
          this.watchlist.stocklist.forEach(element => {
           let temp: Quote  = quote.find(e => e.t === element.t);
            if (temp) {
              element.c_fix = temp.c_fix;
              element.cp_fix = temp.cp_fix;
              element.e = temp.e;
              element.l = temp.l;
              element.ltt = temp.ltt;
            }
          });
        }
      );
    }
  }
}
