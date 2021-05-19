import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroesComponent } from './heroes.component';
import { SortPipe } from '../sort.pipe';
import { InfiniteScrollDirective } from '../infinite-scroll.directive';
import { FavoriteHeroesComponent } from './favorite-heroes/favorite-heroes.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesComponent, SortPipe, InfiniteScrollDirective, FavoriteHeroesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
