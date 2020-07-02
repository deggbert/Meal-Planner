import { TestBed } from '@angular/core/testing';

import { UserInfoResolverService } from './user-info-resolver.service';

describe('UserInfoResolverService', () => {
  let service: UserInfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
