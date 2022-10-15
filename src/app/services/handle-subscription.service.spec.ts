import { TestBed } from '@angular/core/testing';

import { HandleSubscriptionService } from './handle-subscription.service';

describe('HandleSubscriptionService', () => {
  let service: HandleSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
