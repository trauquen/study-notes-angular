import { DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { HeroComponent } from './heroes/hero/hero.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { Component } from '@angular/core';

@Component({
  selector: 'app-key-logger',
  template: '<div></div>',
})
export class KeyLoggerStubComponent {
  @Input() isnumeric?: boolean;
}

let loader: HarnessLoader;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          NoopAnimationsModule,
          HttpClientTestingModule,
          MatMenuModule,
          MatIconModule,
          FormsModule,
        ],
        declarations: [
          AppComponent,
          KeyLoggerStubComponent,
          HeroComponent,
          RouterLinkDirectiveStub,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Hello Angular 11'`, () => {
    expect(component.title).toEqual('Hello Angular 12');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container span').textContent).toContain(
      'Hello Angular 12 app is running!'
    );
  });

  it('should render title by onLike method', async () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.title).toEqual('Michael Bay');
  });

  it('should increase ids by onLike method', async () => {
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    btn.click();
    expect(component.ids).toEqual(1);
  });

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

  it('should get RouterLinks from template', async () => {
    expect(routerLinks.length).toBe(8, 'should have 8 routerLinks');
    expect(routerLinks[0].linkParams).toBe('');
    expect(routerLinks[1].linkParams).toBe('/heroes');
    expect(routerLinks[2].linkParams).toBe('/heroes/1');
    expect(routerLinks[3].linkParams).toBe('/about');
    expect(routerLinks[4].linkParams).toBe('/heroes/login/r');
    expect(routerLinks[5].linkParams).toBe('/material');
    expect(routerLinks[6].linkParams).toBe('/material/clients');
    expect(routerLinks[7].linkParams).toBe('/material/cdk');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[2]; // heroes link DebugElement
    const heroesLink = routerLinks[2]; // heroes link directive

    expect(heroesLink.navigatedTo).toBeNull('should not have navigated yet');

    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(heroesLink.navigatedTo).toBe('/heroes/1');
  });

  it('should get menu and submenu open', async () => {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    expect((await menu.getItems()).length).toEqual(4);
    const submenu = await (
      await menu.getItems({ hasSubmenu: true })
    )[0].getSubmenu();
    await submenu?.open();
    expect((await submenu?.getItems())?.length).toEqual(2);
  });

  it('should get string from input for label', () => {
    const ipt: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const lbl: HTMLLabelElement = fixture.nativeElement.querySelector('label');
    ipt.value = '29232932';
    ipt.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(lbl.textContent).toBe('29232932');
  });
});
