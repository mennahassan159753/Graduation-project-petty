import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from './shared/shared-service.service';
import { Subscription } from 'rxjs';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project';
  currentLang: string = 'ar';
  langSubscription!: Subscription;
  constructor(private mainService: MainService, public sharedService: SharedServiceService) { }
  ngOnInit(): void {
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
      this.setFontFamily(this.currentLang);
    });
  }
  sideCloseHandler() {
    this.sharedService.isCartButton = false;
    this.sharedService.isFavButton = false;
  }
  setFontFamily(lang: string): void {
    if (lang === 'ar') {
      document.body.classList.add('ar');
      document.body.classList.remove('en');
    } else {
      document.body.classList.add('en');
      document.body.classList.remove('ar');
    }
  }
}
