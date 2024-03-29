import { Injectable } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Cart } from 'src/app/models/cart';
import { CartProduct } from 'src/app/models/cartProduct';
import { Product } from 'src/app/models/admin/product';
import { Address, TempShipment, Rate, Tracking } from 'src/app/models/shipping';
import { Order } from 'src/app/models/admin/order';
import { OrderService } from './order.service';
import Big from 'big.js'
import { Router } from '@angular/router';
import { LoadingScreenService } from '../services/loading-screen.service'
import { Variant } from 'src/app/models/admin/product';
import { ProductService } from './product.service';
import { Subject } from 'rxjs';
import { SquareTransactionResponse } from '../models/admin/square';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartSize: number = 0;
  public cart: Cart;
  public subtotal: number = 0;
  public tax: number = 0;
  public shipping: number = 0;
  public total: number = 0;
  public address: Address;
  //public paid: boolean = false;
  private flagged: number[] = [];
  public selected_shipping_rate: Rate;
  taxRate: number = .0775;
  public paid: Subject<boolean> = new Subject<boolean>();


  constructor(public SessionStorage: SessionStorageService,
    public LocalStorageService: LocalStorageService,
    public OrderService: OrderService,
    private Router: Router,
    public LoadingScreenService: LoadingScreenService,
    private ProductService: ProductService) {
      Big.RM = 3;

    let tmp = this.SessionStorage.retrieve('cart');
    if (tmp === null || tmp === undefined) {
      this.cart = new Cart([]);
    } else {
      this.cart = tmp;
    }
    let q = 0;
    for (let i = 0; i < this.cart.products.length; i++) {
      q = +q + +this.cart.products[i].quantity;
    }
    this.cartSize = q;
    this.calcSubtotal();
  }

  addItem(product: CartProduct) {
    //this.paid = false;
    this.paid.next(false);
    if (!this.isAlreadyInCart(product, product.product._id)) {
      this.cart.products.push(product);
      this.cartSize = +this.cartSize + +product.quantity;
    }
    this.SessionStorage.store('cart', this.cart);
    this.calcSubtotal();
  }

  isAlreadyInCart(cartProduct: CartProduct, id): boolean {
    for (let i = 0; i < this.cart.products.length; i++) {
      if (this.cart.products[i].product._id === id) {
        if (cartProduct.selectedSize === this.cart.products[i].selectedSize) {
          this.cartSize = +this.cartSize + +cartProduct.quantity;
          this.cart.products[i].quantity = +this.cart.products[i].quantity + +cartProduct.quantity;
          return true;
        }
      }
    }
    return false;
  }

  removeItem(index: number) {
    this.cartSize = +this.cartSize - +this.cart.products[index].quantity;
    this.cart.products.splice(index, 1);
    this.SessionStorage.store('cart', this.cart);
    this.calcSubtotal();
  }

  updateItemQuantity(index: number, newQuantity: number) {
   //console.log(this.cartSize);
    //console.log(this.cart.products[index].quantity)
    this.cartSize = +this.cartSize - +this.cart.products[index].quantity;
    //console.log(this.cartSize);
    this.cart.products[index].quantity = newQuantity;
    this.cartSize = +this.cartSize + +newQuantity;

    this.SessionStorage.store('cart', this.cart);
    this.calcSubtotal();
  }

  flag(index: number) {
    this.flagged.push(index);
  }

  removeFlagged() {
    //The array gets shorter by one every iteration of the loop so we have to account for that
    //should change to Map at some point
    for (let i = 0; i < this.flagged.length; i++) {
      this.removeItem(this.flagged[i] - i);
    }
  }

  calcWeight() {
    let tmp = 0;
    let weight = 0;

    for (let i = 0; i < this.cart.products.length; i++) {
      tmp = +this.cart.products[i].quantity * +this.cart.products[i].product.weight.ounces;
      weight = +weight + +tmp;
    }

    weight = Number(weight.toFixed(1));
    return weight;
  }

  calcSubtotal() {
    let tmp = 0;
    this.subtotal = 0;

    for (let i = 0; i < this.cart.products.length; i++) {
      let tmp = new Big(this.cart.products[i].product.price).times(this.cart.products[i].quantity).plus(this.subtotal);
      this.subtotal = +tmp.toFixed(2);      
    }

    this.calcTax();
  }

  calcTax() {
    let tmp = new Big(this.subtotal).times(this.taxRate);
    this.tax = +tmp.toFixed(2);
    this.calcTotal();
  }

  calcTotal() {
    let tmp = new Big(this.subtotal).plus(this.tax).plus(this.shipping);
    this.total = +tmp.toFixed(2);
  }

  //GETTERS AND SETTERS
  setShipping(rateObject: Rate) {
    //console.log(rateObject); 
    this.selected_shipping_rate = rateObject;

    this.shipping = +((+rateObject.rate).toFixed(2));
    this.shipping = +(new Big(rateObject.rate).toFixed(0));
    

    //console.log(this.selected_shipping_rate);
    //console.log(this.shipping);
    this.calcTotal();
  }

  setAddress(addr: Address) {
    this.address = addr;
  }

  getSubtotal(): number {
    return this.subtotal;
  }



  
  async onPayment_Paypal(tracking: Tracking, transactionId: string) {
   //REMOVES ITEMS FROM DB
   for (let i = 0; i < this.cart.products.length; i++) {
    let s: Variant = this.cart.products[i].product.inventory.find((variant) => {
      //eventually need to update for color too
      return (variant.size === this.cart.products[i].selectedSize);
    });

    s.quantity -= this.cart.products[i].quantity;
    await this.ProductService.update(this.cart.products[i].product);
   }
   //END REMOVE ITEM FROM DB

    let order: Order = {
      address: this.address,
      products: this.cart.products,
      payment: {
        processor: 'Paypal',
        paypal_txID: transactionId
      },
      subtotal: this.subtotal,
      tax: this.tax,
      taxRate: this.taxRate,
      shipping: this.shipping,
      total: this.total,
      cost: this.calcCost(),
      shipped: false,
      shippingRate: this.selected_shipping_rate,
      shipmentId: this.selected_shipping_rate.shipment_id,
      shippingCarrier: this.selected_shipping_rate.carrier,
      shippingMethod: this.selected_shipping_rate.service,
      trackingNumber: null,
      trackingUrl: null,
      shippingLabel: null,
      return: {
        return_initiated: false,
        return_received: false,
        return_reason: '',
        refund_type: 'None',
        refund_shipping: false,
        refund_shipping_amount: 0,
        refund_tax: 0,
        refund_amount: 0,
        refunded: false,
        notes: ''
      }
    }

    
    let tmp = await this.OrderService.post(order);
    //let stored = this.LocalStorageService.retrieve('orders');
    await this.LocalStorageService.store('order', tmp._id);

    /*
    if (stored === null)
      this.LocalStorageService.store('orders', [tmp._id]);
    else {
      stored.push(tmp._id)
      this.LocalStorageService.store('orders', stored)
    }
    */
    //this.paid = true;
    this.paid.next(true);
    this.clear();
    
    //this.Router.navigate(['thankyou']);
  }


  async onPayment_Square(transaction: SquareTransactionResponse) {
    //REMOVES ITEMS FROM DB
    for (let i = 0; i < this.cart.products.length; i++) {
     let s: Variant = this.cart.products[i].product.inventory.find((variant) => {
       //eventually need to update for color too
       return (variant.size === this.cart.products[i].selectedSize);
     });
 
     s.quantity -= this.cart.products[i].quantity;
     await this.ProductService.update(this.cart.products[i].product);
    }
    //END REMOVE ITEM FROM DB
 
     let order: Order = {
       address: this.address,
       products: this.cart.products,
       payment: {
         processor: 'Square',
         square: transaction
       },
       subtotal: this.subtotal,
       tax: this.tax,
       taxRate: this.taxRate,
       shipping: this.shipping,
       total: this.total,
       cost: this.calcCost(),
       shipped: false,
       shippingRate: this.selected_shipping_rate,
       shipmentId: this.selected_shipping_rate.shipment_id,
       shippingCarrier: this.selected_shipping_rate.carrier,
       shippingMethod: this.selected_shipping_rate.service,
       //trackingNumber: tracking.tracking,
       //trackingUrl: tracking.public_url,
       //shippingLabel: tracking.shippingLabel,
       trackingNumber: null,
       trackingUrl: null,
       shippingLabel: null,
       return: {
         return_initiated: false,
         return_received: false,
         return_reason: '',
         refund_type: 'None',
         refund_shipping: false,
         refund_shipping_amount: 0,
         refund_tax: 0,
         refund_amount: 0,
         refunded: false,
         notes: ''
       }
     }
 
     
     let tmp = await this.OrderService.post(order);
     //let stored = this.LocalStorageService.retrieve('orders');
     await this.LocalStorageService.store('order', tmp._id);
 
     /*
     if (stored === null)
       this.LocalStorageService.store('orders', [tmp._id]);
     else {
       stored.push(tmp._id)
       this.LocalStorageService.store('orders', stored)
     }
     */
     //this.paid = true;
     this.paid.next(true);
     this.clear();
     
   }
 

  calcCost() {
    let cost = new Big(0);
    for (let i = 0; i < this.cart.products.length; i++) {
      let tmp = new Big(this.cart.products[i].product.cost).times(this.cart.products[i].quantity);
      cost = new Big(cost.plus(tmp));
    }
    return +cost.toFixed(2);
  }

  clear() {
    this.paid.next(false);   
    this.cartSize = 0;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
    this.flagged = [];
    this.cart = { products: [] };
    this.SessionStorage.store('cart', this.cart);
  }

  getPaymentStatus() {
    return this.paid.asObservable();
  }
}
