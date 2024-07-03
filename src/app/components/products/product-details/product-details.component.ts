import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/product';
import { MainService } from 'src/app/services/main.service';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  favoritesToggle!: boolean;
  favoriteBtnToggle: boolean = false;
  activeFavorite!: boolean;
  product: any = {};
  cartProducts: any[] = [];
  currentLang: string = 'ar';
  productCategory!: string;
  langSubscription!: Subscription;
  constructor(private router: Router, private sharedServiceService: SharedServiceService, private toastr: ToastrService, private mainService: MainService) { }

  ngOnInit(): void {

    const hasFavList = localStorage.getItem('favoraitsProducts') ? true : false;
    let favoritesList;
    const productString = localStorage.getItem('product');
    if (productString) {
      this.product = JSON.parse(productString);
      if (hasFavList) {
        favoritesList = JSON.parse(
          localStorage.getItem('favoraitsProducts') || '[]'
        )?.find(
          (product: any) => product.id === this.product?.id
        )?.isFavorite;
        this.favoriteBtnToggle = favoritesList;
      }
    }
    this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
      this.loadDataBasedOnLang(this.product);
    });
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  loadDataBasedOnLang(product: Products) {
    if (this.currentLang === 'en') {
      this.productCategory = product.category;
    } else {
      if (product.category === 'Foods') {
        this.productCategory = 'الطعام';
      } else if (product.category === 'Care and cleanliness') {
        this.productCategory = 'الرعاية والنظافة';
      } else if (product.category === 'Homes') {
        this.productCategory = 'البيوت و الأسِرة';
      } else if (product.category === 'Accessories') {
        this.productCategory = 'الاكسسوارات';
      }
    }
  }
  addProduct() {
    if (this.product.itemQuantity < this.product.quantity) {
      this.product.itemQuantity++;
    } else {

      this.toastr.error("Maximum quantity reached");
    }
  }

  subtractProduct() {
    if (this.product.itemQuantity > 1) {
      this.product.itemQuantity--;
    }
  }

  favoritesHandler(): void {
    const hasFavTest = localStorage.getItem('favoraitsProducts') ? true : false;
    if (hasFavTest) {
      let favoritesCollection: Products[] = JSON.parse(
        localStorage.getItem('favoraitsProducts') || '[]'
      );
      let FoundReapetedItem = favoritesCollection?.find((element: any) => {
        return element.id === this.product.id;
      });
      if (FoundReapetedItem) {
        FoundReapetedItem = undefined;
        return;
      } else {
        this.product.isFavorite = true;
        favoritesCollection?.push(this.product);
        localStorage.setItem(
          'favoraitsProducts',
          JSON.stringify(favoritesCollection)
        );
        this.sharedServiceService.favoritesSubject.next(favoritesCollection);


      }
    } else {
      let favoritesCollection: Products[] = [];
      this.product.isFavorite = true;
      favoritesCollection?.push(this.product);
      localStorage.setItem(
        'favoraitsProducts',
        JSON.stringify(favoritesCollection)
      );
      this.sharedServiceService.favoritesSubject.next(favoritesCollection);


    }

    this.product.isFavorite = true;
    this.favoriteBtnToggle = this.product.isFavorite;
  }
  addToCart(event: Event, product: Products) {
    event.stopPropagation();
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart") || '[]');
      let exit = this.cartProducts.find(item => item.id == product.id);
      if (exit) {
        this.toastr.warning("Product is already in your cart")

      }
      else {
        this.cartProducts.push(product);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
        let storedProducts = JSON.parse(localStorage.getItem('cart') || '[]');

        this.sharedServiceService.cartsMenuSubject.next(storedProducts);
        this.toastr.info('The product is added to Cart')
      }
    }
    else {
      this.cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      let storedProducts = JSON.parse(localStorage.getItem('cart') || '[]');

      this.sharedServiceService.cartsMenuSubject.next(storedProducts);

      this.toastr.info('The product is added to Cart')
    }

  }
}
