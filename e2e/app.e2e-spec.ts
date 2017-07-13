import { TurboRacoonPage } from './app.po';

describe('turbo-racoon App', () => {
  let page: TurboRacoonPage;

  beforeEach(() => {
    page = new TurboRacoonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
