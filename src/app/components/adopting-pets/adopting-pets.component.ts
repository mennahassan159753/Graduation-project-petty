import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-adopting-pets',
  templateUrl: './adopting-pets.component.html',
  styleUrls: ['./adopting-pets.component.css']
})
export class AdoptingPetsComponent implements OnInit {
  currentLang: string = 'ar';

  constructor(private router: Router, private toastr: ToastrService, private mainService: MainService, private translate: TranslateService,) { this.translate.setDefaultLang('ar'); }

  pets: any[] = [];
  dogsData: any[] = [];
  catsData: any[] = [];
  birdsData: any[] = [];
  othersData: any[] = [];
  isLoading: boolean = false;
  langSubscription!: Subscription;

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
      this.loadDataBasedOnLang();
    });
    this.loadDataBasedOnLang();
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
  loadDataBasedOnLang() {
    const filePath = this.currentLang === 'en' ? "accepted-adoption-requests.json" : "ar-accepted-adoption-requests.json";
    this.getPetsData(filePath);
  }
  // UTF-8 to Base64 encoding function
  utf8ToBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...new Uint8Array(bytes.buffer)));
  }

  // Base64 to UTF-8 decoding function
  base64ToUtf8(str: string): string {
    const bytes = Uint8Array.from(atob(str), c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  getPetsData(filePath: string) {
    this.pets = [];
    this.isLoading = true;
    this.mainService.getAllData(filePath).subscribe((data: any) => {
      const decodedContent = this.base64ToUtf8(data.content);
      const petsData = JSON.parse(decodedContent);
      this.dogsData = petsData.filter((pet: any) => pet.pet_information.species === 'Dog');
      this.catsData = petsData.filter((pet: any) => pet.pet_information.species === 'Cat');
      this.birdsData = petsData.filter((pet: any) => pet.pet_information.species === 'Bird');
      this.othersData = petsData.filter((pet: any) => pet.pet_information.species === 'Other');
      this.pets = petsData;
      this.isLoading = false;
    }, error => {
      this.toastr.error('Error');
    });
  }


  onMoreInfo(pet: any) {
    localStorage.removeItem('petDetails');
    localStorage.setItem('petDetails', JSON.stringify(pet));
    this.router.navigate(['/pets/adopting-pet-details']);
  }
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
