import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { FavProducts } from 'src/app/models/product';
import { SharedServiceService } from '../shared-service.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favoritesMenu: any[] = [];
  favoriteSubscription!: Subscription;
  choosenFavorite!: any;
  currentLang: string = 'ar';
  langSubscription!: Subscription;
  // favoritesBackup: FavProducts[] = localStorage.getItem('favoraitsProducts');
  constructor(private mainService: MainService, public sharedService: SharedServiceService, private router: Router) {
    this.sharedService.favoritesSubject.subscribe((value: any[]) => {
      this.favoritesMenu = value;
    });
  }

  ngOnInit(): void {
    this.favoritesMenu = JSON.parse(
      localStorage.getItem('favoraitsProducts') || '[]'
    );
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  sideCloseHandler() {
    this.sharedService.isFavButton = false;
  }
  sideOpenHandler() {
    this.sharedService.isFavButton = true;
  }
  onDetailsProduct(product: any) {
    localStorage.removeItem('product');
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigate(['/pets/product-details'])
    this.sharedService.isFavButton = false;
    this.sharedService.isCartButton = false;
  }

  removeFavorite(index: number, selectedFavProduct: any) {
    selectedFavProduct.isFavorite = false;
    this.favoritesMenu.splice(index, 1);

    localStorage.setItem(
      'favoraitsProducts',
      JSON.stringify(this.favoritesMenu)
    );
  }
  closeModal() {
    this.sharedService.isFavButton = false;
  }
}

// this.favoriteSubscription = this.sharedService
//   .getFavoriteProds()
//   .subscribe((value) => {
//     console.log(value);
//   });

