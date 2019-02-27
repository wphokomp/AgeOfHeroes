import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from './../services/hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  @ViewChild('myModal') myModal;
    private modalRef;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute,
    private modalManager: ModalManager
    ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  heroDetails(): void {
    this.modalRef = this.modalManager.open(this.myModal, {
      size: 'md',
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      closeOnOutsideClick: true
    });
  }
}
