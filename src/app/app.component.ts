import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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

  constructor(private router: Router) {
    // this.router.events.
    //   pipe(filter(event => event instanceof NavigationEnd)).subscribe(
    //     (e) => console.log(e)
    //   );
    }

  onLike = (e: string) => {
    window.alert(`I like ${e}`);
    this.title = 'Trauquen YEEN';
    this.ids += 1;
  }
}
