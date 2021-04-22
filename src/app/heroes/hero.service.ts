import { Injectable, Injector } from '@angular/core';
import { Hero } from './hero';

//@Injectable({providedIn: 'root'})
@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return [
      { id: 1, name: 'Boothstomper', team: 'avengers' },
      { id: 2, name: 'Drogfisher', team: 'avengers' },
      { id: 3, name: 'Bloodyllips', team: 'villains' },
      { id: 4, name: 'Mr Bu Moverse', team: 'villains' },
      { id: 5, name: 'Piranhaelli', team: 'curly' }
    ];
  }
}
