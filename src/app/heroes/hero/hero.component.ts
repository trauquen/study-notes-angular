import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { HeroDetailService } from '../hero-detail.service'
import { Hero } from '../hero'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  styles: ['p { color: #900; }'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit {
  hero?: Hero
  @Input() titlep?:string;
  @Input() id?:number;

  constructor(private heroDetailService: HeroDetailService) { }

  ngOnInit(): void {
    if(this.id){
    this.hero = this.heroDetailService.getHero(this.id);}
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.id){
      this.hero = this.heroDetailService.getHero(this.id);
    }

    const hero = changes['titlep'];
    const oldValue = hero.previousValue;
    const newValue = hero.currentValue;
    console.log(`Hero changed from ${oldValue} to ${newValue}`);

    if (!hero.isFirstChange()) {
      console.log(`Hero changed from ${oldValue} to ${newValue}`);
    }
  }

  @Output() liked = new EventEmitter<string>();

  //onClick = () => {console.log("shiver")}
}
