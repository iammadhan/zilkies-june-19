import { TestBed } from '@angular/core/testing';

import { KraListService } from './kra-list.service';

describe('KraListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KraListService = TestBed.get(KraListService);
    expect(service).toBeTruthy();
  });
});
