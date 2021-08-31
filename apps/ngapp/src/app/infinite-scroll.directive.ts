import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { Scroll } from '@angular/router';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Input() appInfiniteScroll?: boolean;
  @Output() more = new EventEmitter();

  @HostBinding('class') currentClass?: string;
  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    console.log(this.appInfiniteScroll);
    if (this.appInfiniteScroll) {
      return;
    }
    if (
      document.documentElement.scrollHeight ==
      document.documentElement.scrollTop + window.innerHeight
    ) {
      this.more.emit();
    }
  }

  constructor() {}
}
