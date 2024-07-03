import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import {
  CartProducts,
  Products,
} from '../../models/product';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartsMenu: Products[] = [];
  currentLang: string = 'ar';
  langSubscription!: Subscription;
  constructor(private mainService: MainService, public sharedServiceService: SharedServiceService, private router: Router) {
    this.sharedServiceService.cartsMenuSubject.subscribe((value) => {
      this.cartsMenu = value;
    });
  }

  ngOnInit() {
    // this.cartsMenu = JSON.parse(localStorage.getItem('cart') || '[]');
    this.sharedServiceService.cartsMenuSubject.subscribe((value) => {
      this.cartsMenu = value;
    });
    this.cartsMenu = JSON.parse(localStorage.getItem('cart') || '[]');
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  onCartPage() {
    this.router.navigate(['/pets/cart']);
    this.sideCloseHandler();
  }
  sideCloseHandler() {
    this.sharedServiceService.isCartButton = false;
  }
  sideOpenHandler() {
    this.sharedServiceService.isCartButton = true;
    // console.log(this.isCartButton);
  }
  closeSideMenu() {
    this.sharedServiceService.isCartButton = false;
  }
  decreaseProdQty(product: any) {
    if (product.itemQuantity < 1) return;
    product.itemQuantity--;
    let productIndexCartMenu = this.cartsMenu.findIndex(
      (item: any) => {
        return product.id === item.id;
      }
    );
    this.cartsMenu[productIndexCartMenu].itemQuantity = product.itemQuantity;

    localStorage.setItem('cart', JSON.stringify(this.cartsMenu));
  }
  increaseProdQty(product: any) {
    if (product.quantity === 0) return;
    product.itemQuantity++;
    let productIndexCartMenu = this.cartsMenu.findIndex(
      (item: any) => {
        return product.id === item.id;
      }
    );
    this.cartsMenu[productIndexCartMenu].itemQuantity = product.itemQuantity;
    localStorage.setItem('cart', JSON.stringify(this.cartsMenu));
  }
  deleteFromCart(idx: number) {
    this.cartsMenu.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartsMenu));
  }

}
