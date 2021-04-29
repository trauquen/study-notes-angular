import { Directive, HostBinding, HostListener, OnInit, ElementRef, Input } from '@angular/core';
import { of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {
  @HostBinding('class')
  currentClass?: string;

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const logger = of(event);
    logger.pipe(
      map((e: KeyboardEvent) => {
        const s: number = e.key.charCodeAt(0);
        console.log(s);
        if (s > 31 && (s < 48 || s > 57)) {
          e.preventDefault();
          this.currentClass = 'invalid';
        } else {
          this.currentClass = 'valid';
        }
        return s;
      }),
      filter(code => {
          // console.log(code);
          return !(code > 31 && (code < 48 || code > 57));
        })
        // tap(digit => this.keys += String.fromCharCode(digit))
    )
    .subscribe();


    // const charCode = event.key.charCodeAt(0);
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   this.currentClass = 'invalid';
    //   event.preventDefault();
    // } else {
    //   this.currentClass = 'valid';
    // }
  }

  constructor() { }

  // ngOnInit(): void = {
  //     const logger = fromEvent(this.input.nativeElement,
  //     'keyup');
  //     logger.pipe(
  //     tap((evt: KeyboardEvent) => this.keys += evt.key)
  //     ).subscribe();
  //     }
}
