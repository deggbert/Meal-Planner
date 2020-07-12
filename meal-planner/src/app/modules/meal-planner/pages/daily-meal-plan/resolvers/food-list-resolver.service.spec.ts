import { TestBed } from '@angular/core/testing';

import { FoodListResolverService } from './food-list-resolver.service';

describe('FoodListResolverService', () => {
  let service: FoodListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
