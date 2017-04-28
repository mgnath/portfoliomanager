import { Component, OnInit, Input} from '@angular/core';

import {FinanceService} from '../core/services/finance.service';
import {UtilService} from '../core/services/util.service';
import { StockInfo, WatchList } from '../core/interfaces/stock-info';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocks: StockInfo[];
  @Input() newTicker:string;
  @Input() newWL:string;
  watchList:string[];
  action:string;
  watchlists: WatchList[];


  @Input() selectedWL:WatchList;
  @Input() newWLTicker:string;


  constructor( private financeService: FinanceService, private util:UtilService) { 
    this.watchList = ["AAPL","MSFT"];
    this.newTicker ="";
    this.action="Refresh";
    this.watchlists = financeService.getWatchLists();
  }

  ngOnInit() {
    this.refreshData();
    //this.stocks = this.financeService.getLatestStockPriceMoq();
  }

  refreshData(){
    if(this.watchList.length>0){
      this.action="Loading";
     this.financeService.getLatestStockPrice(this.watchList)
      .subscribe(stockInfo => this.updateUI(stockInfo));
    }
  }
  refreshWLData(){
    if(this.selectedWL.stocklist.length>0){
      this.financeService.getLatestStockPrice(this.selectedWL.stocklist.map(e=>e.t))
      .subscribe(stockInfo => this.selectedWL.stocklist = stockInfo);
    }
  }
  updateUI(stockInfo){
    this.stocks = stockInfo; 
    this.action="Refresh";
  }
  addTicker(){
    if(this.newTicker.length >0 ){
      this.watchList.push(this.newTicker);
      this.newTicker = "";
      this.refreshData();
    }
  }
  createWatchlist(){
    this.financeService.addWatchList(this.newWL);
    this.watchlists = this.financeService.getWatchLists();
  }
  addTickerToWL(){
    if(this.newWLTicker.length >0 ){
      console.log(this.selectedWL.name);
      let newStock = new StockInfo();
      newStock.t = this.newWLTicker;
      this.selectedWL.stocklist = this.selectedWL.stocklist || [];
      this.selectedWL.stocklist.push(newStock);
      this.financeService.updateWatchList(this.selectedWL);
      this.newWLTicker = "";
      this.refreshWLData();
    }
  }
}
