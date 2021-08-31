import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PermissionDirective } from './permission.directive';

const roles = ['admin', 'agent'];

@Component({
  template: `<ng-template *appPermission="roles">
    <div>Template Reference Here!</div>
  </ng-template>`,
})
class TestHostComponent {
  public roles = roles;
}

describe('PermissionDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestHostComponent, PermissionDirective],
      providers: [TemplateRef, ViewContainerRef],
    }).createComponent(TestHostComponent);
    // fixture.detectChanges();
  });

  it('should create an instance', () => {
    const tmpl = fixture.elementRef.nativeElement;
    const vc = fixture.debugElement.nativeElement;
    const directive = new PermissionDirective(tmpl, vc);
    expect(directive).toBeTruthy();
  });
});
