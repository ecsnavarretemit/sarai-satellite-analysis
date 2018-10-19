/*!
 * App E2E Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

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


