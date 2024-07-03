import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'pets/home', pathMatch: 'full'
  },
  {
    path: 'pets/home', component: HomePageComponent
  },
  {
    path: 'pets', loadChildren: () => import("./components/components.module").then((m) => m.ComponentsModule)
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // Ensure scrolling to the top on route navigation
    scrollOffset: [0, 0], // Optional: Adjust scrolling position if necessary
    anchorScrolling: 'enabled', // Optional: Enable anchor scrolling
    // scrollRestoration: 'disabled' // Disable scroll restoration
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
