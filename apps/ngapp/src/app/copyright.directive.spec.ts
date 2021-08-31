import { Component, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CopyrightDirective } from './copyright.directive';

@Component({
  template: '<p appCopyright></p>',
})
class TestHostComponent {}

describe('CopyrightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestHostComponent, CopyrightDirective],
    }).createComponent(TestHostComponent);
  });

  it('should create an instance', () => {
    const renderer = fixture.componentRef.injector.get(Renderer2);
    const directive = new CopyrightDirective(fixture.elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
