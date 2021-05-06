import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroResolverService } from './hero-resolver.service';

describe('HeroResolverService', () => {
  let service: HeroResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HeroResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
