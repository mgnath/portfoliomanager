import { TestBed, inject } from '@angular/core/testing';

import { FinanceService } from './finance.service';

describe('FinanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceService]
    });
  });

  it('should ...', inject([FinanceService], (service: FinanceService) => {
    //service.getLatestStockPrice(["AAPL","MSFT"])
    expect(service).toBeTruthy();
  }));
});
