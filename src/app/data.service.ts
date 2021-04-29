import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './heroes/hero';

@Injectable({providedIn: 'root'})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb(): {heroes: Hero []} {
    return {
      heroes: [
        { id: 1, name: 'Boothstomper', team: 'avengers' },
        { id: 2, name: 'Drogfisher', team: 'avengers' },
        { id: 3, name: 'Bloodyllips', team: 'villains' },
        { id: 4, name: 'Mr Bu Moverse', team: 'villains' },
        { id: 5, name: 'Piranhaelli', team: 'curly' }
      ]
    };
  }
}
