import { Hero } from './../hero';
import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[];
  len: number;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(result => {
        console.log(result);
        if (result.length > 4) {
          this.heroes = result.slice(1, 5);
        } else {
          this.heroes = result;
        }
        this.len = this.heroes.length;
      });
  }

  createHero(): void {
  }
}
