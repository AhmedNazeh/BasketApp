import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/account/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./pages/city/city.module').then(m => m.CityPageModule)
  },
  { 
   path: 'thanks',
    loadChildren: () => import('./pages/thanks/thanks.module').then(m => m.ThanksPageModule)
  },
  { path: 'basket-off', loadChildren: './pages/basket-off/basket-off.module#BasketOffPageModule' },
  { path: 'orders', loadChildren: './pages/orders/orders.module#OrdersPageModule' },
  { path: 'place-order', loadChildren: './pages/place-order/place-order.module#PlaceOrderPageModule' },
  { path: 'account-info', loadChildren: './pages/account-info/account-info.module#AccountInfoPageModule' },
  { path: 'basket-history', loadChildren: './pages/basket-history/basket-history.module#BasketHistoryPageModule' },  { path: 'signup', loadChildren: './pages/account/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './pages/account/login/login.module#LoginPageModule' },
  { path: 'about-us', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' }


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
