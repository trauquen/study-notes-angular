import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroFavorService } from './hero-favor.service';
import { HeroService } from './hero.service';

describe('HeroFavorService', () => {
  let service: HeroFavorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, HeroFavorService]
    });
    service = TestBed.inject(HeroFavorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
