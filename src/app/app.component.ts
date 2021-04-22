import { Component } from '@angular/core';
import { Hero } from './heroes/hero';
import { HeroDetailService } from './heroes/hero-detail.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],providers: [HeroDetailService]
})
export class AppComponent {
  title = 'Hello Angular 11';
  hero?:Hero;
  ids?:number;

  onLike = (e:string) => {
    window.alert(`I like ${e}`);
    this.title = "Trauquen YEEN";
    this.hero = {id: 6, name: 'Carly Curly', team: 'villains'};
    this.ids = 3
  }
}
