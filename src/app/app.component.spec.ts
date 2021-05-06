import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { HeroComponent } from './heroes/hero/hero.component';
// import { HeroesComponent } from './heroes/heroes.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeroComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Hello Angular 11'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(component.title).toEqual('Hello Angular 11');
  });

  it('should render title', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container span').textContent).toContain('Hello Angular 11 app is running!');
  });

  it('should render title by onLike method', async () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    console.log(button);
    button.triggerEventHandler('click', null);
    expect(component.title).toEqual('Michael Bay');
  });
});
