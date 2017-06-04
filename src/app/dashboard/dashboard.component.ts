import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { FinanceService } from '../core/services/finance.service';
import { UtilService } from '../core/services/util.service';
import { Quote, WatchList } from '../core/interfaces/stock-info';
import { MdGridListModule, MdButton } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  @Input() newWL: string;
  action: string;
  firewatchlists: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;
  msgVal: string = '';

  constructor(private financeService: FinanceService, private util: UtilService) {
    this.user = this.financeService.user;
  }

  ngOnInit() {
    this.firewatchlists = this.financeService.watchLists;
  }

  DeleteWL(key: string) {
    this.financeService.deleteWatchList(key);
    //this.watchlists = this.financeService.getWatchLists();
  }
  createWatchlist() {
    if (!this.financeService.checkIfWatchlistExists(this.newWL)) {
      this.financeService.addWatchList(this.newWL);
      this.newWL = "";
    }
    else { alert("Watchlist already exists"); }
  }
}