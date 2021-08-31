import { Component, OnInit, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
  NoopAnimationPlayer,
} from '@angular/animations';
import { AnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('sizeAnimation', [
      state(
        'small',
        style({
          transform: 'scale(1)',
          backgroundColor: 'green',
        })
      ),
      state(
        'large',
        style({
          transform: 'scale(1.4)',
          backgroundColor: 'red',
        })
      ),
      transition('* => large', animate('500ms ease-in')),
      transition('large => small', animate('500ms ease-out')),
    ]),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(200%)' })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  state?: string;
  stateFly?: string;
  showMe?: boolean;
  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  ngOnInit(): void {
    const factory = this.builder.build([
      style({ width: '200px' }),
      animate(1000, style({ width: '500px' })),
    ]);
    const textEl = this.el.nativeElement.querySelector('.text');
    const player = factory.create(textEl);
    player.play();
  }

  appear(): void {
    this.state = 'in';
    this.showMe = true;
  }

  disappear(): void {
    this.showMe = false;
  }

  started(evt: AnimationEvent): void {
    console.log('Animation started');
  }
  finished(evt: AnimationEvent): void {
    console.log('Animation finished');
  }
}
