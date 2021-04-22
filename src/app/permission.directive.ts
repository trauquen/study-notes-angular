import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  @Input() appPermission?: string[];
  private currentRole = 'agent';

  constructor(private tmplRef: TemplateRef<any>, private vc: ViewContainerRef) { }

  ngOnInit() {
    console.log(this.tmplRef, this.vc);
    if (this.appPermission?.indexOf(this.currentRole) === -1) {
      this.vc.clear();
    } else {
      this.vc.createEmbeddedView(this.tmplRef);
    }
  }

}
