import { Component, OnInit, Input} from '@angular/core';

import {FinanceService} from '../core/services/finance.service';
import {StockInfo} from '../core/interfaces/stock-info';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocks: StockInfo[];
  @Input() newTicker:string;
  watchList:string[];
  action:string;


  constructor( private financeService: FinanceService) { 
    this.watchList = ["AAPL","MSFT"];
    this.newTicker ="";
    this.action="Refresh";
  }

  ngOnInit() {
    this.refreshData();
    //this.stocks = this.financeService.getLatestStockPriceMoq();
  }
  refreshData(){
    if(this.watchList.length>0){
      this.action="Loading";
     this.financeService.getLatestStockPrice(this.watchList)
      .then(stockInfo => this.updtaeUI(stockInfo));
    }
  }
  updtaeUI(stockInfo){
    this.stocks = stockInfo; 
    this.action="Refresh";
  }
  addTicker(){
    console.log(this.newTicker);
    if(this.newTicker.length >0 ){
      this.watchList.push(this.newTicker);
      this.newTicker = "";
      this.refreshData();
    }
  }

}
