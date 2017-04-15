import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  constructor() { }

}

Object.defineProperty(Array.prototype,
  "pushIfNotNull", {
    value:function pushIfNotNull(item:any){
      if(item != null){
        this.push(item);
      }
    }
  }
);