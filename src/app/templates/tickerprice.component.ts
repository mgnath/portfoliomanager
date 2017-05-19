import { Component, OnInit, Input } from '@angular/core';
import { Quote, StockInfo } from "app/core/interfaces/stock-info";

@Component({
  selector: 'pm-tickerprice',
  templateUrl: './tickerprice.component.html',
})
export class TickerpriceComponent implements OnInit {
   @Input() stock: StockInfo;
  constructor() { }

  ngOnInit() {
  }

}
