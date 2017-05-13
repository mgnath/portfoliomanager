import { Component, OnInit, Input } from '@angular/core';
import { StockInfo } from "app/core/interfaces/stock-info";

@Component({
  selector: 'pm-tickerprice',
  template:`<span style="font-size:small;">
        <b>{{stock.t}}&nbsp;&nbsp;{{stock.l}}&nbsp;&nbsp;</b></span>
        <span [ngClass]="{'red': stock.c_fix < 0, 'green': stock.c_fix > 0}" style="font-size:small;"> {{stock.c_fix}} ({{stock.cp_fix}}%) </span>
        <span style="font-size:small;">&nbsp;&nbsp;{{stock.ltt}}</span>`
})
export class TickerpriceComponent implements OnInit {
   @Input() stock: StockInfo;
  constructor() { }

  ngOnInit() {
  }

}
