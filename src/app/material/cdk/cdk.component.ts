import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../shared/hero';
import { HeroService } from '../../heroes/hero.service';

@Component({
  selector: 'app-cdk',
  templateUrl: './cdk.component.html',
  styleUrls: ['./cdk.component.scss']
})
export class CdkComponent implements OnInit {
  content = '';
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    );
  }

  reorder(event: CdkDragDrop<Hero[]>): void {
    moveItemInArray(this.heroes, event.previousIndex, event.currentIndex);
    console.log(this.heroes);
  }

}
