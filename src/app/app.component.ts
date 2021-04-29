import { Component } from '@angular/core';
import { Hero } from './heroes/hero';
import { HeroDetailService } from './heroes/hero-detail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeroDetailService]
})
export class AppComponent {
  title = 'Hello Angular 11';
  hero?: Hero;
  ids = 1;
  numeric?: string;
  isnumeric = true;

  onLike = (e: string) => {
    window.alert(`I like ${e}`);
    this.title = 'Trauquen YEEN';
    this.ids += 1;
  }
}
