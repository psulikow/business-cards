import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticsEventServiceService } from './google-analytics-event-service.service';

describe('GoogleAnalyticsEventServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleAnalyticsEventServiceService = TestBed.get(GoogleAnalyticsEventServiceService);
    expect(service).toBeTruthy();
  });
});
