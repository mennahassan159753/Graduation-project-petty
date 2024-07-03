import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  menuActive = false;
  isScrolled: boolean = false;
  currentLang: string = 'ar';
  langSubscription!: Subscription;
  constructor(private mainService: MainService, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
  }


  scrollToServices(): void {
    this.viewportScroller.scrollToAnchor('our-services');
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }
}
