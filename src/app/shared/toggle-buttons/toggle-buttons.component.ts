import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: './toggle-buttons.component.html',
  styleUrls: ['./toggle-buttons.component.css']
})
export class ToggleButtonsComponent implements OnInit {
  @Input() typeClasses!: string;
  @Input() btnClasses!: string;
  @Input() badgeNumber: number = 0;
  isScrolled: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }
}
