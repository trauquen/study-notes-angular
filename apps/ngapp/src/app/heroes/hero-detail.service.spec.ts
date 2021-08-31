import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroDetailService } from './hero-detail.service';

describe('HeroDetailService', () => {
  let service: HeroDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
