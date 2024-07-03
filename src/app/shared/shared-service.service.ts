import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Products } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  isCartButton: boolean = false;
  isFavButton: boolean = false;
  favAndCartToggle = false;
  cartsMenuSubject: Subject<any[]> = new Subject<any[]>();
  uiFavoritesDisplay: Products[] = [];
  favoritesSubject: Subject<Products[]> = new Subject<Products[]>();
  favoriteRemoveSubj: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getFavoriteProds() {
    return this.favoritesSubject.asObservable();
  }
  getCartItems() {
    return this.cartsMenuSubject.asObservable();
  }
}
