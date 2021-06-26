import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoriteHeroesComponent } from './favorite-heroes.component';
import { HeroFavorService } from '../hero-favor.service';
import { heroTest } from 'src/testing/hero-test';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailService } from '../hero-detail.service';
import { Hero } from 'src/app/shared/hero';
import { HeroService } from '../hero.service';

describe('FavoriteHeroesComponent', () => {
  let component: FavoriteHeroesComponent;
  let fixture: ComponentFixture<FavoriteHeroesComponent>;
  // const heroService = jasmine.createSpyObj('HeroFavorService', ['getHeroes']);
  // const getHeroesSpy = heroService.getHeroes.and.returnValue(of(heroTest));

  let heroServiceStub: Partial<HeroService>;

  heroServiceStub = {
    getHeroes(): Observable<Hero[]> {
      return of(heroTest.slice(0, 4));
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteHeroesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .overrideComponent(FavoriteHeroesComponent, {
      set: {
        providers: [ { provide: HeroService, useValue: heroServiceStub } ]
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteHeroesComponent);
    component = fixture.componentInstance;
    // fixture.debugElement.injector.get(HeroService);
    // TestBed.inject(HeroFavorService).getHeroes();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heroes list', fakeAsync(() => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('li').length).toEqual(4);
  }));
});
