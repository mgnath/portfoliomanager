export class StockInfo {
    t:string;
    e:string;
    l:number;
    c_fix:number;
    cp_fix:number;
    ltt:Date;
    stake:number;
}

export class WatchList{
    id:string;
    name:string;
    stocklist:Array<StockInfo>;
}

export interface Map<T> {
    [K: string]: T;
}
