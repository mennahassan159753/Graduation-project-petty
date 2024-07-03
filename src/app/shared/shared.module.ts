import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ToggleButtonsComponent } from './toggle-buttons/toggle-buttons.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoaderComponent } from './loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToggleButtonsComponent,
    CartComponent,
    FavoriteComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ToggleButtonsComponent,
    CartComponent,
    FavoriteComponent,
    LoaderComponent
  ]
})
export class SharedModule {

}
