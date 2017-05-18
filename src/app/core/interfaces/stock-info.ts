export class Quote {
    t:string;
    e:string;
    l:number;
    c_fix:number;
    cp_fix:number;
    ltt:Date;
}

export class WatchList{
    id:string;
    name:string;
    stocklist:Array<StockInfo>;
}

export class StockInfo{
    t:string;
    e:string;
    l:number;
    c_fix:number;
    cp_fix:number;
    ltt:Date;
    stake:number;
}