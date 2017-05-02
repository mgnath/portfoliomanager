import { Component, OnInit, Input } from '@angular/core';

import { FinanceService } from '../core/services/finance.service';
import { UtilService } from '../core/services/util.service';
import { StockInfo, WatchList } from '../core/interfaces/stock-info';
import { MdGridListModule } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sandBoxWL: WatchList;
  @Input() newWL: string;
  action: string;
  watchlists: WatchList[];
  stream: Observable<number>;
  toggleMode: boolean;
  subscription:Subscription;
  constructor(private financeService: FinanceService, private util: UtilService) {
    this.sandBoxWL = new WatchList();
    this.sandBoxWL.stocklist = [];
    this.action = "Pause Auto";
    this.toggleMode = true;
    this.stream = Observable.interval(50000);
  }

  ngOnInit() {
    this.watchlists = this.financeService.getWatchLists();
    this.toggleSandBox();
  }

  toggleSandBox() {
    if (this.toggleMode) {
       this.action = "Pause Auto";
      this.subscription = this.stream.subscribe((x) => {
                            console.log('updating...' + x);
                          });
    }
    else {
       this.action = "Go Auto";
       console.log('unsubscribing...');
      this.subscription.unsubscribe();
    }
    this.toggleMode = !this.toggleMode;
  }

  createWatchlist() {
    if (!this.financeService.checkIfWatchlistExists(this.newWL)) {
      this.financeService.addWatchList(this.newWL);
      this.watchlists = this.financeService.getWatchLists();
      this.newWL = "";
    }
    else { alert("Watchlist already exists"); }
  }
}
