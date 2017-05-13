import { Component, OnInit, Input, EventEmitter} from '@angular/core';

import { FinanceService } from '../core/services/finance.service';
import { UtilService } from '../core/services/util.service';
import { StockInfo, WatchList } from '../core/interfaces/stock-info';
import { MdGridListModule, MdButton } from '@angular/material';
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
  constructor(private financeService: FinanceService, private util: UtilService) {
    this.sandBoxWL = new WatchList();
    this.sandBoxWL.stocklist = [];
  }

  ngOnInit() {
    this.watchlists = this.financeService.getWatchLists();
  }

  DeleteWL(watchlist:WatchList) {
    this.financeService.deleteWatchList(watchlist);
    this.watchlists = this.financeService.getWatchLists();
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