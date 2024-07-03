import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-carousel-adopting-pets',
  templateUrl: './carousel-adopting-pets.component.html',
  styleUrls: ['./carousel-adopting-pets.component.css']
})
export class CarouselAdoptingPetsComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService, private mainService: MainService) { }
  pets: any[] = [];
  isLoading: boolean = false;
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
  currentLang: string = 'ar';
  langSubscription!: Subscription;
  ngOnInit(): void {
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
      this.loadDataBasedOnLang();
    });
    this.loadDataBasedOnLang();
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
