import { SaraiSatelliteAnalysisPage } from './app.po';

describe('sarai-satellite-analysis App', () => {
  let page: SaraiSatelliteAnalysisPage;

  beforeEach(() => {
    page = new SaraiSatelliteAnalysisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
