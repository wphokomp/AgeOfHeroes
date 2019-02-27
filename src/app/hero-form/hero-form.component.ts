import { HeroService } from './../services/hero.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from './../hero';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})

export class HeroFormComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer',
            'Being black', 'Pretty', 'Really Fast',
            'Mastery of magic', 'Flight', 'Armored weapons',
            'Just rich', 'Known superhuman powers', 'Martial Artist Expert'
          ];

  hero = new Hero();
  submitted = false;

  @ViewChild('myModal') myModal;
    private modalRef;

  constructor(private modalService: ModalManager, private heroService: HeroService) { }

  ngOnInit() {
  }

  closeModal() {
      this.modalService.close(this.modalRef);
  }

  onSubmit() {
    this.heroService.createHero(this.hero)
      .subscribe(hero => console.log(hero));

    this.modalRef = this.modalService.open(this.myModal, {
      size: 'md',
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      closeOnOutsideClick: true
    });
  }

  newHero() {
    this.hero = new Hero();
  }
}
