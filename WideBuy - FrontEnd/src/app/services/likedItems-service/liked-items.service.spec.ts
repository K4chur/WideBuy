import { TestBed } from '@angular/core/testing';

import { LikedItemsService } from './liked-items.service';

describe('LikedItemsService', () => {
  let service: LikedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
