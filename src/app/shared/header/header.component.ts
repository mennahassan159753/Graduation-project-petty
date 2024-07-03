import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuActive = false;
  isScrolled: boolean = false;
  isCatMenuActive: boolean = false;
  isDogMenuActive: boolean = false;
  isBirdMenuActive: boolean = false;
  isFishMenuActive: boolean = false;
  currentLang: string = 'ar'
  constructor(private mainService: MainService, private translate: TranslateService, private router: Router, private route: ActivatedRoute) {
    this.translate.setDefaultLang('ar');
  }


  ngOnInit(): void {
    // this.translate.use('ar');
    localStorage.setItem('lang', 'ar');
    this.mainService.setLang('ar');

  }

  switchLanguage(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const lang = isChecked ? 'en' : 'ar';
    localStorage.setItem('lang', lang);
    this.mainService.setLang(lang);
    this.translate.use(lang);
    this.currentLang = lang;
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
  togglePetMenu(petType: string): void {
    // debugger
    if (petType === "dog") {
      this.isDogMenuActive = !this.isDogMenuActive;
      this.isCatMenuActive = false;
      this.isBirdMenuActive = false;
      this.isFishMenuActive = false;
    } else if (petType === "cat") {
      this.isCatMenuActive = !this.isCatMenuActive;
      this.isDogMenuActive = false;
      this.isBirdMenuActive = false;
      this.isFishMenuActive = false;
    } else if (petType === "bird") {
      this.isBirdMenuActive = !this.isBirdMenuActive;
      this.isDogMenuActive = false;
      this.isCatMenuActive = false;
      this.isFishMenuActive = false;
    } else if (petType === "fish") {
      this.isFishMenuActive = !this.isFishMenuActive;
      this.isDogMenuActive = false;
      this.isCatMenuActive = false;
      this.isBirdMenuActive = false;
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }

  onShowProducts(petType: string, category: string) {
    localStorage.removeItem('petType');
    localStorage.removeItem('category');
    localStorage.setItem('petType', petType);
    localStorage.setItem('category', category);
    this.router.navigate(['/pets/products']);
  }


}
