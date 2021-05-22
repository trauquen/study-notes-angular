import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroesComponent } from './heroes.component';
import { SortPipe } from '../sort.pipe';
import { InfiniteScrollDirective } from '../infinite-scroll.directive';
import { FavoriteHeroesComponent } from './favorite-heroes/favorite-heroes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { HeroService } from './hero.service';
import { Hero } from '../shared/hero';
import { heroTest } from '../shared/hero-test';

const heroService: Partial<HeroService> = {
  getHeroes(): Observable<Hero[]>{
    return of(heroTest);
  }
};

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesComponent, SortPipe, InfiniteScrollDirective, FavoriteHeroesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatCardModule]
    }).overrideComponent(HeroesComponent, {
      set: {
        providers: [ { provide: HeroService, useValue: heroService } ]
      }
    })
    .compileComponents();
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    TestBed.inject(HeroService).getHeroes();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display heroes', () => {
    expect(fixture.nativeElement.querySelectorAll('mat-card').length).toBe(5);
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(10);
  });

  it('should has class first in Json list', () => {
    expect(fixture.nativeElement.querySelector('li')).toHaveClass('first');
  });
});
