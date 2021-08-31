import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoriteHeroesComponent } from './favorite-heroes.component';
import { HeroFavorService } from '../hero-favor.service';
import { heroTest } from '../../../testing/hero-test';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailService } from '../hero-detail.service';
import { Hero } from '../../shared/hero';
import { HeroService } from '../hero.service';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FavoriteHeroesComponent', () => {
  let component: FavoriteHeroesComponent;
  let fixture: ComponentFixture<FavoriteHeroesComponent>;
  // const heroService = jasmine.createSpyObj('HeroFavorService', ['getHeroes']);
  // const getHeroesSpy = heroService.getHeroes.and.returnValue(of(heroTest));

  let heroServiceStub: Partial<HeroService>;

  heroServiceStub = {
    getHeroes(): Observable<Hero[]> {
      return of(heroTest.slice(0, 4));
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteHeroesComponent, RouterLinkDirectiveStub],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .overrideComponent(FavoriteHeroesComponent, {
        set: {
          providers: [{ provide: HeroService, useValue: heroServiceStub }],
        },
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

  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];

  beforeEach(() => {
    fixture.detectChanges(); // trigger initial data binding
    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );
    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map((de) => de.injector.get(RouterLinkDirectiveStub));
    fixture.detectChanges();
  });

  fit('should get RouterLinks from template', async () => {
    console.log(Object.values(linkDes));
    expect(routerLinks.length).toBe(4);
    routerLinks.forEach((e, i) => expect(e.linkParams).toEqual(['./', i + 1]));
  });
});
