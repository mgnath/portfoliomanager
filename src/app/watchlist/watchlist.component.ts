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
  @Input() deletable:boolean;
  stream: Observable<number>;
  subscription:Subscription;

  newWLTicker: string;
  constructor(private financeService: FinanceService, private apiService:ApiService) { 
     this.stream = Observable.interval(50000);
  }

  ngOnInit() {
    this.refreshWLData();
    //this.toggleAuto(this.auto);
  }
  toggleAuto(enable:Boolean) {
    if (enable) {
      this.subscription = this.stream.subscribe((x) => {
                            console.log('updating...' + x);
                            this.refreshWLData();
                          });
    }
    else {
      if(this.subscription){
        console.log('unsubscribing...');
        this.subscription.unsubscribe();
      }
    }
  }
  addTickerToWL() {
    if (this.newWLTicker.length > 0) {
      this.financeService.addTickerToWatchList(this.newWLTicker,this.watchlist );
      this.newWLTicker = "";
      this.refreshWLData();
    }
  }
  DeleteWL(){
    if(this.deletable){
      this.financeService.deleteWatchList(this.watchlist);
    }
  }
  refreshWLData() {
    if (this.watchlist.stocklist && this.watchlist.stocklist.length > 0) {
      this.apiService.getLatestStockPrice(this.watchlist.stocklist.map(e => e.t))
        .subscribe(stockInfo => this.watchlist.stocklist = stockInfo);
    }
  }
}
