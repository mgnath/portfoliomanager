import { PortfoliomanagerPage } from './app.po';

describe('portfoliomanager App', () => {
  let page: PortfoliomanagerPage;

  beforeEach(() => {
    page = new PortfoliomanagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
