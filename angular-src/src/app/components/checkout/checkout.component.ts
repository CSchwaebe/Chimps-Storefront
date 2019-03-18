import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CartProduct } from '../../models/cartProduct'; //see below
import { Cart } from '../../models/cart'; ///must use models so they are separte items in memory
import { CartService } from '../../services/cart.service';
import { Address, TempShipment, Rate } from 'src/app/models/shipping';
import { ShippingService } from '../../services/shipping.service';
import { ProductService } from '../../services/product.service';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { TitleService } from 'src/app/services/title.service';
import { MailingListService } from 'src/app/services/mailing-list.service';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('submitButton') submitButton: ElementRef;
  cart: Cart;
  showAddressForm: boolean = false;
  addressValidated: boolean = false;
  productsRemovedFromDB: boolean = false;
  paymentReceived: boolean = false;
  payStepComplete: boolean = false;
  model: Address = {
    name: '',
    email: '',
    phone: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    verify: ['delivery']
  };
  addToMailingList: boolean = true;
  shippingRates: Rate[];
  subscription: Subscription;
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(public CartService: CartService,
    public ShippingService: ShippingService,
    private ProductService: ProductService,
    public LoadingScreenService: LoadingScreenService,
    public TitleService: TitleService,
    private MailingListService: MailingListService) {
      this.TitleService.setTitle('Checkout');
      
    this.subscription = this.CartService.getPaymentStatus().subscribe(paymentStatus => {
      if (paymentStatus === true && this.payStepComplete===false) {
        window.scrollTo(0, 0);
        this.payStepComplete = true;
        this.stepper._stateChanged;
        setTimeout(() => {
          this.stepper.next();     
          this.LoadingScreenService.off(); 
      }, 1500);
      
        this.paymentReceived = paymentStatus;
      }
      
    });

    
    this.loadingSubscription = this.LoadingScreenService.getLoading().subscribe(isLoading => {
      this.loading = isLoading;
    });

    

  }


  
  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }


  /**
   * Called when the user submits their address
   */
  async submitAddress() {
    this.LoadingScreenService.on();
    this.submitButton.nativeElement.disabled = true;
    let weight = await this.CartService.calcWeight();
    //console.log(this.CartService.cart);
    //PROBLEM - WHAT IF TEMP SHIPMENT is wrong, does it retun null or waht????
    let tempShipment: TempShipment = await this.ShippingService.createShipment(this.model, weight);

    if (tempShipment === null) {
      this.LoadingScreenService.off();
      alert('We were unable to veriy your address. Please ensure that it is correct and try again.')
      this.submitButton.nativeElement.disabled = false;
      return;
    }
    this.shippingRates = tempShipment.rate_objects;
    console.log(tempShipment)
    this.shippingRates = this.shippingRates.filter(function (value, index, arr) {
      return value.delivery_days !== null;
    })

    console.log(this.shippingRates)
    if (this.shippingRates.length === 0) {
      console.log('hello')
      this.shippingRates = tempShipment.rate_objects;
    }


    /*
    this.shippingRates = this.shippingRates.filter(function (value, index, arr) {
      return value.delivery_days !== null;
    })
    */
    this.shippingRates.sort((rate1, rate2) => +rate1.rate - +rate2.rate);
    this.CartService.setShipping(this.shippingRates[0]);
    this.CartService.setAddress(this.model);
    this.addressValidated = true;

    window.scrollTo(0, 0);


    setTimeout(() => {
      this.stepper.next();
      console.log(this.stepper.selectedIndex)
    }, 1);

    if (this.addToMailingList) {
      this.MailingListService.post({
        name: this.model.name,
        email: this.model.email,
        phone: this.model.phone,
      })
    }
     
    this.LoadingScreenService.off();
  }

  /**
   * Removes a product from the cart
   * 
   * @param index 
   */
  removeProduct(index: number) {
    this.CartService.removeItem(index);
  }






}
