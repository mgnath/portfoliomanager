import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pm-usercard',
  template:`<img *ngIf="user" class="card" src="{{user.picture}}" title="{{user.name}}">`,
  styles: [`
    .card {
      height: 32px;
      width: 32px;
      border:0px;
      border-radius:50%;
    }
  `]
})
export class UserCardComponent implements OnInit {
   @Input() user: any;
  constructor() { }

  ngOnInit() {
  }

}
