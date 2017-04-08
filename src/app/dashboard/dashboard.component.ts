import { Component, OnInit } from '@angular/core';
import {FinanceService} from '../core/services/finance.service';
import {StockInfo} from '../core/interfaces/stock-info';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocks: StockInfo[];
  sample:string;
  constructor( private financeService: FinanceService) { }

  ngOnInit() {
    // this.financeService.getLatestStockPrice(["AAPL","MSFT"])
    //   .then(stockInfo => this.stocks = stockInfo);
    this.stocks = this.financeService.getLatestStockPriceMoq();
  }

}
