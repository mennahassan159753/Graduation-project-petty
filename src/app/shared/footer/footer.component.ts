import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentLang: string = 'ar';
  langSubscription!: Subscription;
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}
