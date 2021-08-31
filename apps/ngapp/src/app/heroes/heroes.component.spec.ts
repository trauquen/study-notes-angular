import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroesComponent } from './heroes.component';
import { SortPipe } from '../shared/sort.pipe';
import { InfiniteScrollDirective } from '../infinite-scroll.directive';
import { FavoriteHeroesComponent } from './favorite-heroes/favorite-heroes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { HeroService } from './hero.service';
import { heroTest } from '../../testing/hero-test';
import { By } from '@angular/platform-browser';

// const heroService: Partial<HeroService> = {
//   getHeroes(): Observable<Hero[]>{
//     return of(heroTest);
//   }
// };

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  const heroService = jasmine.createSpyObj('HeroService', [
    'getHeroes',
    'creatHero',
    'editHero',
    'removeHero',
  ]);
  const getHeroesSpy = heroService.getHeroes.and.returnValue(of(heroTest));
  const creatHeroSpy = heroService.creatHero.and.callThrough();
  const editHeroSpy = heroService.editHero.and.returnValue(of(1));
  const removeHeroSpy = heroService.removeHero.and.returnValue(of(4));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        SortPipe,
        InfiniteScrollDirective,
        FavoriteHeroesComponent,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatCardModule],
    })
      .overrideComponent(HeroesComponent, {
        set: {
          providers: [{ provide: HeroService, useValue: heroService }],
        },
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
    expect(getHeroesSpy.calls.any()).toBe(true, 'getHeroes called');
    expect(fixture.nativeElement.querySelectorAll('mat-card').length).toBe(
      heroTest.length
    );
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(
      2 * heroTest.length
    );
  });

  it('should has class first in Json list', () => {
    expect(fixture.nativeElement.querySelector('li')).toHaveClass('first');
  });

  it('should add hero when click add hero button', fakeAsync(() => {
    const btn = fixture.nativeElement.querySelector('#btnAddHero');
    btn.click();
    expect(creatHeroSpy.calls.any()).toBe(true, 'creatHero called');
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('mat-card').length).toBe(
      heroTest.length
    );
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(
      2 * heroTest.length
    );
  }));

  it(
    'should rename hero Boothstomper to Pricezog',
    waitForAsync(() => {
      const mat = fixture.debugElement
        .queryAll(By.css('mat-card-title'))
        .find(
          (el) => el.nativeElement.textContent.indexOf('Drogfisher') !== -1
        );
      const btn: HTMLButtonElement =
        fixture.nativeElement.querySelector('#btnRename');
      btn.click();
      expect(editHeroSpy.calls.any()).toBe(true, 'rename hero called');
      fixture.detectChanges();
      expect(mat?.nativeElement.textContent).toContain('Pricezog');
    })
  );

  it('should remove hero when click remove button', async () => {
    const matLen = fixture.nativeElement.querySelectorAll('mat-card').length;
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('#btnRemove');
    btn.click();
    expect(removeHeroSpy.calls.any()).toBe(true, 'remove hero called');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('mat-card').length).toBe(
      matLen - 1
    );
  });

  it('should get heroes when click refresh hero button', fakeAsync(() => {
    const btn = fixture.nativeElement.querySelector('#btnRefresh');
    btn.click();
    expect(getHeroesSpy.calls.any()).toBe(true, 'getHeroes called');
  }));
});
