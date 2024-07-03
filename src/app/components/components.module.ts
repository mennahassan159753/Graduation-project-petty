import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomePageModule } from './home-page/home-page.module';
import { ProductsComponent } from './products/products.component';
import { SheltersComponent } from './shelters/shelters.component';
import { AddPetsComponent } from './add-pets/add-pets.component';
import { AdoptingPetsComponent } from './adopting-pets/adopting-pets.component';
import { CarouselModule } from 'primeng/carousel';
import { AdoptingPetDetailsComponent } from './adopting-pets/adopting-pet-details/adopting-pet-details.component';

import { CartPageComponent } from './cart-page/cart-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { SharedModule } from '../shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductsComponent,
    SheltersComponent,
    AddPetsComponent,
    AdoptingPetsComponent,
    AdoptingPetDetailsComponent,
    CartPageComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsRoutingModule,
    HomePageModule,
    CarouselModule,
    DropdownModule,
    AccordionModule,
    AvatarModule,
    BadgeModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule,
    TranslateModule,
  ]
})
export class ComponentsModule { }
