import { LiveGreenPage } from './app.po';

describe('live-green App', () => {
  let page: LiveGreenPage;

  beforeEach(() => {
    page = new LiveGreenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
