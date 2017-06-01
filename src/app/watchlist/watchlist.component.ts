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
  @Input() key: string;
  @Input() watchlist: WatchList;
  @Input() auto: boolean;
  @Input() deletable: boolean;
  @Output()
  delete: EventEmitter<string> = new EventEmitter<string>();

  stream: Observable<number>;
  subscription: Subscription;

  newWLTicker: string;
  initialStake:number;

  constructor(private financeService: FinanceService, private apiService: ApiService) {
    this.stream = Observable.interval(30000);
  }

  ngOnInit() {
    this.refreshWLData();
    this.toggleAuto(this.auto);
  }
  deleteWL() {
    this.delete.emit(this.key);
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
      this.financeService.addTickerToWatchList(this.key,this.newWLTicker,this.initialStake, this.watchlist);
      this.newWLTicker = "";
      this.initialStake = 0;
      this.refreshWLData();
    }
  }
  getTotal(){
    if( this.watchlist.stocklist)
    {
      let indTotals = this.watchlist.stocklist.map(x=> x.l*x.stake );
      let total = 0;
      indTotals.forEach(
        e => total += e
      );
      return total.toFixed(2);
    }
    else{return 0;}
  }
  refreshWLData() {
    if (this.watchlist.stocklist && this.watchlist.stocklist.length > 0) {
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
