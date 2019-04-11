import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartProduct } from '../../models/cartProduct'; //see below
import { Cart } from '../../models/cart'; ///must use models so they are separte items in memory
import { CartService } from '../../services/cart.service';
import { ShippingService } from '../../services/shipping.service';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/admin/product';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  storeName: string = 'Big Kat Original';
  cart: Cart;
  paymentRecieved: boolean = false;
  subscription: Subscription;
  
  constructor(public CartService: CartService,
    public ShippingService: ShippingService,
    private ProductService: ProductService,
    private Router: Router,
    private TitleService: TitleService) {
      this.TitleService.setTitle('Cart');
    this.subscription = this.CartService.paid.subscribe(paymentReceived => { this.paymentRecieved = paymentReceived; });
  }

  ngOnInit() {
    window.scrollTo(0,0);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Called when the user initiates the checkout flow
   */
  async checkout() {
    //Check inventory
    let ret: boolean = true;
    let productArray: CartProduct[] = this.CartService.cart.products;
    for (let i = 0; i < productArray.length; i++) {
      let tmpProd = await this.ProductService.getById(productArray[i].product._id)
      let available = await this.checkAvailability(i, tmpProd, productArray[i].selectedSize, productArray[i].quantity);
      if (!available) {
        ret = false;
      }
    }

    //Removes Items that are out of stock from the cart if necessary
    //Notifies the user that their cart has changed
    if (!ret) {
      this.CartService.removeFlagged();

      alert('Some items in your cart are not available in the sizes/quantities you selected. ' +
        'We\'ve updated your cart to reflect these changes.');
      return
    }

    window.scrollTo(0, 0);
    window.location.assign('/checkout');
   // this.Router.navigateByUrl('http://localhost:4200/checkout');
  }

  /**
   * Checks the DB to see if the product is available and perfoms appropriate actions on DB entries
   * 
   * @param index 
   * @param product 
   * @param size 
   * @param quantity 
   */
  async checkAvailability(index: number, product: Product, size: string, quantity: number) {
    let variant = product.inventory.find((variant) => {
      //eventually need to update for color too
      return (variant.size === size);
    });

    let i = product.inventory.findIndex((variant) => {
      //eventually need to update for color too
      return (variant.size === size);
    });

    if (variant.quantity >= quantity) {
      return true;
    } else if (variant.quantity === 0) {
      return this.outOfStock(index);
    } else {
      return await this.limitedQuantity(index, variant.quantity)
    }

  }

  /**
   * Handles the case where an item in cart is out of stock
   * 
   * @param index 
   */
  outOfStock(index: number) {
    this.CartService.flag(index);
    return false;
  }

  /**
   * Handles the case where an item in cart is no longer available in the quantity selected
   * 
   * @param index 
   * @param availableQuantity
   */
  async limitedQuantity(index: number, availableQuantity: number) {
    this.CartService.updateItemQuantity(index, availableQuantity);
    return false;
  }

  /**
   * Removes a product from the cart
   * 
   * @param index 
   */
  removeProduct(index: number) {
    this.CartService.removeItem(index);
  }

  changeQty(index: number, newQuantity: number) {
    if (newQuantity === 0) {
      this.removeProduct(index);
    } else {
      this.CartService.updateItemQuantity(index, newQuantity)
    }
    console.log(this.CartService.cartSize)

  }






}
