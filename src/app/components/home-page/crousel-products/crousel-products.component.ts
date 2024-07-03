import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/product';
import { MainService } from 'src/app/services/main.service';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crousel-products',
  templateUrl: './crousel-products.component.html',
  styleUrls: ['./crousel-products.component.css']
})
export class CrouselProductsComponent implements OnInit, OnDestroy {
  isAddedToCart: boolean = false;
  products: Products[] = [];
  isLoading: boolean = false;
  cartProducts: any[] = [];
  currentLang: string = 'ar';
  langSubscription!: Subscription;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sharedServiceService: SharedServiceService,
    private mainService: MainService
  ) { }

  carouselResponsiveOptions: any[] = [
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '855px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '595px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    // this.currentLang = this.mainService.getLang();
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
      this.loadDataBasedOnLang();
    });
    this.loadDataBasedOnLang();
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  onDetailsProduct(product: any) {
    localStorage.removeItem('product');
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigate(['/pets/product-details'])
  }
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  loadDataBasedOnLang() {
    const filePath = this.currentLang === 'en' ? 'products.json' : 'ar-products.json';
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
    this.products = [];
    this.isLoading = true;
    this.mainService.getAllData(filePath).subscribe({
      next: (data: any) => {
        const decodedContent = this.base64ToUtf8(data.content);
        const productsData = JSON.parse(decodedContent);
        this.products = productsData?.slice(0, 20) || [];
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Error');
        this.isLoading = false;
      }
    });
  }

  addToCart(event: Event, product: Products) {
    event.stopPropagation();
    this.cartProducts = JSON.parse(localStorage.getItem("cart") || '[]');
    let exit = this.cartProducts.find(item => item.id === product.id);
    if (exit) {
      this.toastr.warning("Product is already in your cart");
    } else {
      this.cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      this.sharedServiceService.cartsMenuSubject.next(this.cartProducts);
      this.toastr.info('The product is added to Cart');
    }
  }
}
