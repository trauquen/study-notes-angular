import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-key-logger',
  templateUrl: './key-logger.component.html',
  styleUrls: ['./key-logger.component.css']
})
export class KeyLoggerComponent implements OnInit {

  keys = '';
  @Input() isnumeric?: boolean;
  @ViewChild('keyContainer', {static: true}) input?: ElementRef;

  constructor() { }

  ngOnInit(): void {
    const logger = fromEvent<KeyboardEvent>(this.input?.nativeElement, 'keypress');
    logger.pipe(
      tap((evt: KeyboardEvent) => {
        const code = evt.key.charCodeAt(0);
        const target = this.input?.nativeElement.classList;
        if (this.isnumeric && code > 31 && (code < 48 || code > 57)) {
          evt.preventDefault();
          target.add('invalid');
        } else {
          target.remove('invalid');
        }
      }),
      map((evt: KeyboardEvent) => evt.key.charCodeAt(0)),
      filter(code => {
        if (this.isnumeric) {
          return !(code > 31 && (code < 48 || code > 57));
        }
        return true;
      }),
      tap(digit => this.keys += String.fromCharCode(digit))
    ).subscribe();
  }
}
