import { TestBed } from '@angular/core/testing';

import { DataopsService } from './dataops.service';

describe('DataopsService', () => {
  let service: DataopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
