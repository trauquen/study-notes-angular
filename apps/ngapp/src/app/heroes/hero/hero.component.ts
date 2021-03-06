import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { HeroDetailService } from '../hero-detail.service';
import { Hero } from '../../shared/hero';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, skipWhile, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  styles: ['p { color: #900; }'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeroComponent implements OnInit, OnChanges {
  hero?: Hero;
  @Input() titlep?: string;
  @Input() id?: number;
  @Output() liked = new EventEmitter<string>();
  isError?: boolean;
  errorMsg?: string;

  constructor(
    private heroDetailService: HeroDetailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.getHero(this.id);
    }

    // this.getHeroObs();

    this.route.data
      .pipe(catchError((err) => throwError(err)))
      .subscribe((data) => {
        if (typeof data.hero === 'object') {
          this.isError = false;
          this.hero = data.hero;
        } else {
          if (data.hero) {
            this.isError = true;
            this.errorMsg = data.hero;
          }
        }
      });
  }

  // private getHeroObs(): void {
  //   this.route.paramMap.pipe(
  //     skipWhile((params: ParamMap) => params.get('id') === null),
  //     switchMap((params: ParamMap) => {
  //       // console.log(params);
  //       const id = params.get('id') as any;
  //       return this.heroDetailService.getHero(id);
  //     }),
  //     map(hero => this.hero = hero)
  //   ).subscribe(
  //     res => console.log(res),
  //     error => console.log(error)
  //   );
  // }

  private getHero(id: number): void {
    this.heroDetailService.getHero(id).subscribe(
      (hero) => {
        this.hero = hero;
        console.log(hero);
      },
      (error) => console.log(error)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty.call(changes, key)) {
        switch (key) {
          case 'id': {
            const chng = changes[key];
            if (!chng.isFirstChange()) {
              this.getHero(chng.currentValue);
            }
            break;
          }
          case 'titlep': {
            const chng = changes[key];
            const prev = chng.previousValue;
            const curr = chng.currentValue;
            console.log(`Hero changed from ${prev} to ${curr}`);

            if (!chng.isFirstChange()) {
              console.log(`Hero changed from ${prev} to ${curr}`);
            }
            break;
          }
        }
      }
    }
  }
}
