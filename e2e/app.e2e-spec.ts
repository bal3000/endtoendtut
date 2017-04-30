import { EndToEndTutPage } from './app.po';

describe('end-to-end-tut App', function() {
  let page: EndToEndTutPage;

  beforeEach(() => {
    page = new EndToEndTutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
