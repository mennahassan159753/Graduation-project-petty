import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/product';
import { MainService } from 'src/app/services/main.service';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private sharedServiceService: SharedServiceService, private toastr: ToastrService, private mainService: MainService) { }
  products: Products[] = [];
  isLoading: boolean = false;
  page = 1;
  pageSize = 20;
  collectionSize = 0;
  productsLists: any[] = [];
  searchValue!: string;
  cartProducts: any[] = [];
  currentLang: string = 'ar';
  isScrolled: boolean = false;
  langSubscription!: Subscription;

  ngOnInit(): void {

    this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
      this.loadDataBasedOnLang();
    });

    this.loadDataBasedOnLang();

  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  loadDataBasedOnLang() {
    this.currentLang = this.mainService.getLang();
    this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
    const petType = localStorage.getItem('petType');
    const category = localStorage.getItem('category');

    const currentRoute = this.router.url.split('/').pop();
    if ((petType || category) && currentRoute === 'products') {
      this.divideProducts();
    } else {
      if (this.currentLang === 'en') {
        this.getPetsData('products.json');
      } else {
        this.getPetsData('ar-products.json');
      }
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }


  showCategories: boolean = true;
  activeFilter: string = '*';

  handleClick(filter: string, petType: string): void {
    this.activeFilter = filter;
    localStorage.setItem('petType', petType);
    localStorage.setItem('category', '');

  }
  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
  searchProducts() {
    if (this.searchValue) {
      this.products = this.productsLists.filter((product: any) =>
        product.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    } else {
      this.products = this.products;
      this.applyPagination();
    }
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
  getPetsData(filePathUrl: string, category?: string) {
    this.products = [];
    this.isLoading = true;
    this.mainService.getAllData(filePathUrl).subscribe((data: any) => {
      const decodedContent = this.base64ToUtf8(data.content);

      const productsData = JSON.parse(decodedContent);
      this.products = productsData;
      if (category === 'foods') {
        this.products = productsData.filter((product: any) => product.category === 'Foods');
      } else if (category === 'care') {
        this.products = productsData.filter((product: any) => product.category === 'Care and cleanliness');
      } else if (category === 'houses') {
        this.products = productsData.filter((product: any) => product.category === 'Homes');
      } else if (category === 'accessories') {
        this.products = productsData.filter((product: any) => product.category === 'Accessories');
      } else {
        this.products = productsData;
      }
      this.productsLists = this.products.slice();
      this.applyPagination();
      this.isLoading = false;
    }, error => {
      this.toastr.error('Error');
    });
  }
  applyPagination() {
    let filteredProducts = this.productsLists;
    this.collectionSize = filteredProducts.length;
    this.products = filteredProducts.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  filterProducts(category: string, subcategory: string) {
    localStorage.removeItem('petType');
    localStorage.removeItem('category');
    localStorage.setItem('petType', category);
    localStorage.setItem('category', subcategory);
    this.divideProducts();
    // localStorage.removeItem('petType');
    // localStorage.removeItem('category');
  }
  divideProducts() {
    const petType = localStorage.getItem('petType');
    const category = localStorage.getItem('category');
    if (petType === 'dogs' && category === 'foods') {
      if (this.currentLang === "en") {
        this.getPetsData("dogs-products.json", 'foods');
      } else {
        this.getPetsData("ar-dogs-products.json", 'foods');
      }
    } else if (petType === 'dogs' && category === 'care') {
      if (this.currentLang === "en") {
        this.getPetsData("dogs-products.json", 'care');
      } else {
        this.getPetsData("ar-dogs-products.json", 'care');
      }
    } else if (petType === 'dogs' && category === 'houses') {
      if (this.currentLang === "en") {
        this.getPetsData("dogs-products.json", 'houses');
      } else {
        this.getPetsData("ar-dogs-products.json", 'houses');
      }
    } else if (petType === 'dogs' && category === 'accessories') {
      if (this.currentLang === "en") {
        this.getPetsData("dogs-products.json", 'accessories');
      } else {
        this.getPetsData("ar-dogs-products.json", 'accessories');
      }
    } else if (petType === 'cats' && category === 'foods') {
      if (this.currentLang === "en") {
        this.getPetsData("cats-products.json", 'foods');
      } else {
        this.getPetsData("ar-cats-products.json", 'foods');
      }
    } else if (petType === 'cats' && category === 'care') {
      if (this.currentLang === "en") {
        this.getPetsData("cats-products.json", 'care');
      } else {
        this.getPetsData("ar-cats-products.json", 'care');
      }

    } else if (petType === 'cats' && category === 'houses') {
      if (this.currentLang === "en") {
        this.getPetsData("cats-products.json", 'houses');
      } else {
        this.getPetsData("ar-cats-products.json", 'houses');
      }

    } else if (petType === 'cats' && category === 'accessories') {
      if (this.currentLang === "en") {
        this.getPetsData("cats-products.json", 'accessories');
      } else {
        this.getPetsData("ar-cats-products.json", 'accessories');
      }
    } else if (petType === 'birds' && category === 'foods') {
      if (this.currentLang === "en") {
        this.getPetsData("birds-products.json", 'foods');
      } else {
        this.getPetsData("ar-birds-products.json", 'foods');
      }
    } else if (petType === 'birds' && category === 'care') {
      if (this.currentLang === "en") {
        this.getPetsData("birds-products.json", 'care');
      } else {
        this.getPetsData("ar-birds-products.json", 'care');
      }
    } else if (petType === 'birds' && category === 'houses') {
      if (this.currentLang === "en") {
        this.getPetsData("birds-products.json", 'houses');
      } else {
        this.getPetsData("ar-birds-products.json", 'houses');
      }
    } else if (petType === 'birds' && category === 'accessories') {
      if (this.currentLang === "en") {
        this.getPetsData("birds-products.json", 'accessories');
      } else {
        this.getPetsData("ar-birds-products.json", 'accessories');
      }
    } else if (petType === 'fishes' && category === 'foods') {
      if (this.currentLang === "en") {
        this.getPetsData("fishes-products.json", 'foods');
      } else {
        this.getPetsData("ar-fishes-products.json", 'foods');
      }
    } else if (petType === 'fishes' && category === 'care') {
      if (this.currentLang === "en") {
        this.getPetsData("fishes-products.json", 'care');
      } else {
        this.getPetsData("ar-fishes-products.json", 'care');
      }
    } else if (petType === 'fishes' && category === 'houses') {
      if (this.currentLang === "en") {
        this.getPetsData("fishes-products.json", 'houses');
      } else {
        this.getPetsData("ar-fishes-products.json", 'houses');
      }
    } else if (petType === 'fishes' && category === 'accessories') {
      if (this.currentLang === "en") {
        this.getPetsData("fishes-products.json", 'accessories');
      } else {
        this.getPetsData("ar-fishes-products.json", 'accessories');
      }
    } else if (petType === 'dogs' && category === '') {
      if (this.currentLang === "en") {
        this.getPetsData("dogs-products.json");
      } else {
        this.getPetsData("ar-dogs-products.json");
      }
    } else if (petType === 'cats' && category === '') {
      if (this.currentLang === "en") {
        this.getPetsData("cats-products.json");
      } else {
        this.getPetsData("ar-cats-products.json");
      }
    } else if (petType === 'birds' && category === '') {
      if (this.currentLang === "en") {
        this.getPetsData("birds-products.json");
      } else {
        this.getPetsData("ar-birds-products.json");
      }
    } else if (petType === 'fishes' && category === '') {
      if (this.currentLang === "en") {
        this.getPetsData("fishes-products.json");
      } else {
        this.getPetsData("ar-fishes-products.json");
      }
    }
  }
  onDetailsProduct(product: any) {
    localStorage.removeItem('product');
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigate(['/pets/product-details'])
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
    // this.sharedServiceService.cartsMenuSubject.subscribe((value) => {
    //   this.cartProducts = value;
    // });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('petType');
    localStorage.removeItem('category');
  }
}
