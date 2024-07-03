import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { SheltersComponent } from './shelters/shelters.component';
import { AddPetsComponent } from './add-pets/add-pets.component';
import { AdoptingPetsComponent } from './adopting-pets/adopting-pets.component';
import { AdoptingPetDetailsComponent } from './adopting-pets/adopting-pet-details/adopting-pet-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shelters', component: SheltersComponent },
  { path: 'adopting', component: AdoptingPetsComponent },
  { path: 'add-pets', component: AddPetsComponent },
  { path: 'adopting-pet-details', component: AdoptingPetDetailsComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'product-details', component: ProductDetailsComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
