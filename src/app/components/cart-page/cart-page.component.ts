import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/product';
import { MainService } from 'src/app/services/main.service';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private sharedServiceService: SharedServiceService, private toastr: ToastrService, private mainService: MainService) { }
  currentLang: string = 'ar';
  langSubscription!: Subscription;

  orderForm!: FormGroup;
  cartProducts: Products[] = [];
  total: number = 0;
  shipping: number = 0;
  tax: number = 0;
  isLoading: boolean = false;
  currentStep: number = 1;  // to track the current step

  ngOnInit(): void {
    this.getCartProducts();
    this.initForm();
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  initForm(): void {
    this.orderForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      message: new FormControl('')
    });
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      let cartData = JSON.parse(localStorage.getItem("cart") || '[]');
      this.cartProducts = cartData.map((product: any) => {
        if (this.currentLang === 'ar') {
          switch (product.category) {
            case 'Foods':
              product.categoryAr = 'الطعام';
              break;
            case 'Care and cleanliness':
              product.categoryAr = 'الرعاية والنظافة';
              break;
            case 'Homes':
              product.categoryAr = 'البيوت و الأسِرة';
              break;
            case 'Accessories':
              product.categoryAr = 'الاكسسوارات';
              break;
            default:
              product.categoryAr = product.category; // Fallback if no translation is found
              break;
          }
        }
        return product;
      });
    }
    this.getCartTotalPrice();
  }


  getCartTotalPrice() {
    this.total = 0;
    for (let product of this.cartProducts) {
      this.total += product.price * product.itemQuantity;
    }
    this.total += (this.shipping + this.tax);
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.sharedServiceService.cartsMenuSubject.next(this.cartProducts);
    this.getCartTotalPrice();
  }

  onClearCart() {
    this.cartProducts = [];
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.sharedServiceService.cartsMenuSubject.next(this.cartProducts);
    this.getCartProducts();
  }

  nextOrSubmit() {
    if (this.currentStep === 3) {
      this.onSubmit();
    } else {
      this.currentStep++;
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step >= 1 && step <= 3) {
      this.currentStep = step;
    }
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  onSubmit(): void {
    if (this.orderForm.invalid) {
      return;
    }
    this.isLoading = true;
    const orderData = {
      id: this.createId(),
      user_info: {
        full_name: this.orderForm.get('fullName')?.value,
        shipping_address: this.orderForm.get('address')?.value,
        phone_number: this.orderForm.get('phone')?.value,
        message: this.orderForm.get('message')?.value,
      },
      products: this.cartProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        price: product.price,
        quantity: product.itemQuantity
      }))
    };
    console.log(orderData)
    this.mainService.addItemToJSON('new-orders.json', orderData, () => {
      this.onClearCart();
      this.orderForm.reset();
      this.toastr.success('Order placed successfully!', 'Success');
      this.isLoading = false;
    });
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
