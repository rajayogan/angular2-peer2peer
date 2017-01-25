import { SimplepeerPage } from './app.po';

describe('simplepeer App', function() {
  let page: SimplepeerPage;

  beforeEach(() => {
    page = new SimplepeerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
