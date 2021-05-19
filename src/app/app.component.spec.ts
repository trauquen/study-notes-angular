import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { HeroComponent } from './heroes/hero/hero.component';
import { KeyLoggerComponent } from './key-logger/key-logger.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatIconModule,
        MatMenuModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        HeroComponent,
        KeyLoggerComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Hello Angular 11'`, () => {
    expect(component.title).toEqual('Hello Angular 12');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container span').textContent).toContain('Hello Angular 12 app is running!');
  });

  it('should render title by onLike method', async () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.title).toEqual('Michael Bay');
  });

  it('should increase ids by onLike method', async () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(component.ids).toEqual(1);
  });
});
