import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-adopting-pet-details',
  templateUrl: './adopting-pet-details.component.html',
  styleUrls: ['./adopting-pet-details.component.css']
})
export class AdoptingPetDetailsComponent implements OnInit {

  constructor(private mainService: MainService) { }
  currentLang: string = 'ar';
  langSubscription!: Subscription;

  pet: any = {};
  carouselResponsiveOptions: any[] = [
    {
      breakpoint: '1200px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '595px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
    const petDetailsString = localStorage.getItem('petDetails');
    if (petDetailsString) {
      this.pet = JSON.parse(petDetailsString);
    }

  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

}
