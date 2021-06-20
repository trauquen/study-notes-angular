import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroComponent } from './hero.component';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Hero } from 'src/app/shared/hero';
import { heroTest } from 'src/testing/hero-test';
import { HeroDetailService } from '../hero-detail.service';
import { of } from 'rxjs';
import { HeroResolverService } from './hero-resolver.service';

let component: HeroComponent;
let fixture: ComponentFixture<HeroComponent>;

fdescribe('HeroComponent', () => {
  let resolver: HeroResolverService;
  let router: ActivatedRoute;
  const heroService = jasmine.createSpyObj('HeroDetailService', ['getHero']);
  const getHeroSpy = heroService.getHero.and.returnValue(of(heroTest[3]));

  beforeEach(() => {
    resolver = new HeroResolverService(heroService);
    router = new ActivatedRoute();
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      imports: [HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ HeroDetailService, { provide: HeroDetailService, useValue: heroService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;

    component.titlep = 'Michael Bay';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display titlep in headline', () => {
    expect(fixture.debugElement.query(By.css('p span')).nativeElement.textContent).toContain('Michael Bay');
  });

  it('should raise liked event when clicked (triggerEventHandler)', () => {
    let emitString: string | undefined;
    component.liked.pipe(first()).subscribe(t => emitString = t);

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(emitString).toEqual('Hunter Hustle');
  });

  it('should display that hero\'s name', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(fixture.debugElement.query(By.css('#heroSpan')).nativeElement.textContent).toContain('Bloodyllips');
  }));
});

xdescribe('HeroComponent without route resolver', () => {
  let activatedRoute: ActivatedRouteStub;
  const expectedHero: Hero = heroTest[3];
  const heroService = jasmine.createSpyObj('HeroDetailService', ['getHero']);
  const getHeroSpy = heroService.getHero.and.returnValue(of(heroTest[expectedHero.id - 1]));

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HeroDetailService, useValue: heroService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;

    component.titlep = 'Michael Bay';
    fixture.detectChanges();
  });

  it('should display that hero\'s name', fakeAsync(() => {
    activatedRoute.setParamMap({id: expectedHero.id});
    expect(getHeroSpy.calls.any()).toBe(true, 'getHero called');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#heroSpan')).nativeElement.textContent).toContain(expectedHero.name);
  }));
});
