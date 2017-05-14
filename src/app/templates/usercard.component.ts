import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pm-usercard',
  template:`<img class="card" src="{{user.picture}}">`,
  styles: [`
    .card {
      height: 32px;
      width: 32px;
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
