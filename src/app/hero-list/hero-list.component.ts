import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from './../hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  private heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroList();
  }

  getHeroList(): void {
    this.heroService.getHeroes()
      .subscribe(
        (result) => {
          this.heroes = result;
          // console.log(result);
        });
  }

  deleteHero(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero._id)
      .subscribe(
        result => console.log(result)
      );
  }

}
