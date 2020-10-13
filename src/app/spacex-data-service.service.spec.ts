import { TestBed } from '@angular/core/testing';

import { SpacexDataServiceService } from './spacex-data-service.service';

describe('SpacexDataServiceService', () => {
  let service: SpacexDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpacexDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
