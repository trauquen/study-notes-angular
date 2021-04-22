import { TestBed } from '@angular/core/testing';

import { HeroFavorService } from './hero-favor.service';

describe('HeroFavorService', () => {
  let service: HeroFavorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroFavorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
