import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxPayPalModule } from 'ngx-paypal';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CollectionService } from './services/collection.service';
import { PaypalComponent } from './components/paypal/paypal.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { ShippingService } from './services/shipping.service';
import { IterableNumberPipe } from './pipes/iterable-number.pipe';

import { MaterialModule } from './material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from './services/snackbar.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoadingScreenService } from './services/loading-screen.service';
import { TitleService } from './services/title.service';
import { ContactComponent } from './components/contact/contact.component';
import { SquareComponent } from './components/square/square.component';
import { CartService } from './services/cart.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products/detail',
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'thankyou',
    component: ThanksComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'detail/:stub',
    component: ProductDetailComponent
  },
  {
    path: 'square',
    component: SquareComponent
  },
  {
    path: ':collection',
    component: ProductsComponent
  },
  {
    path: ':collection/:category',
    component: ProductsComponent
  },
  {
    path: ':collection/:category/:subcategory',
    component: ProductsComponent
  },

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    PaypalComponent,
    ThanksComponent,
    IterableNumberPipe,
    CheckoutComponent,
    ContactComponent,
    SquareComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxPayPalModule,
    QuillModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    CollectionService,
    ShippingService,
    SnackbarService,
    LoadingScreenService,
    TitleService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
