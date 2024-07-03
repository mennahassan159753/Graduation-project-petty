import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { HeroComponent } from './hero/hero.component';
import { CrouselProductsComponent } from './crousel-products/crousel-products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CarouselAdoptingPetsComponent } from './carousel-adopting-pets/carousel-adopting-pets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomePageComponent,
    HeroComponent,
    CrouselProductsComponent,
    AboutUsComponent,
    OurServicesComponent,
    CarouselAdoptingPetsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ButtonModule,
    SharedModule, TranslateModule
  ]
})
export class HomePageModule { }
