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
  sandBoxWL: WatchList;
  @Input() newWL: string;
  action: string;
  watchlists: WatchList[];

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(private financeService: FinanceService, private util: UtilService,
    public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
    this.user = this.afAuth.authState;

    this.sandBoxWL = new WatchList();
    this.sandBoxWL.stocklist = [];
  }

  ngOnInit() {
    this.watchlists = this.financeService.getWatchLists();
  }

  DeleteWL(watchlist: WatchList) {
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

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  Send(desc: string) {
    this.items.push({ message: desc });
    this.msgVal = '';
  }
}