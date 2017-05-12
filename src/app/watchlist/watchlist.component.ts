import { Component, OnInit, Input } from '@angular/core';
import { WatchList, StockInfo } from "app/core/interfaces/stock-info";
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
  stream: Observable<number>;
  subscription: Subscription;

  newWLTicker: string;
  constructor(private financeService: FinanceService, private apiService: ApiService) {
    this.stream = Observable.interval(60000);
  }

  ngOnInit() {
    this.refreshWLData();
    this.toggleAuto(this.auto);
  }
  toggleAuto(enable: Boolean) {
    if (enable) {
      this.subscription = this.stream.subscribe((x) => {
        //console.log('refreshing..' + this.watchlist.name + '...' + x);
        this.refreshWLData();
      });
    }
    else {
      //console.log('unsubscribing..' + this.watchlist.name);
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
  refreshWLData() {
    if (this.watchlist.stocklist && this.watchlist.stocklist.length > 0) {
      // this.apiService.getLatestStockPrice(this.watchlist.stocklist.map(e => e.t))
      //   .subscribe(stockInfo => this.watchlist.stocklist = stockInfo);
      this.apiService.GetJsonPResponse(this.watchlist.stocklist.map(e => e.t),
        (stockInfo => this.watchlist.stocklist = stockInfo));
    }
  }
}
