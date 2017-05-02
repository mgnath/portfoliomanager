import { Component, OnInit, Input } from '@angular/core';
import { WatchList, StockInfo } from "app/core/interfaces/stock-info";
import { FinanceService } from "app/core/services/finance.service";

@Component({
  selector: 'pm-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  @Input() watchlist: WatchList;
  newWLTicker: string;
  constructor(private financeService: FinanceService) { }

  ngOnInit() {
    this.refreshWLData();
  }
  addTickerToWL() {
    if (this.newWLTicker.length > 0) {
      this.financeService.addTickerToWatchList(this.newWLTicker,this.watchlist );
      this.newWLTicker = "";
      this.refreshWLData();
    }
  }
  refreshWLData() {
    if (this.watchlist.stocklist && this.watchlist.stocklist.length > 0) {
      this.financeService.getLatestStockPrice(this.watchlist.stocklist.map(e => e.t))
        .subscribe(stockInfo => this.watchlist.stocklist = stockInfo);
    }
  }
}
