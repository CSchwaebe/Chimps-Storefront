import { Component, OnInit } from '@angular/core';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal'
import { CartService } from '../../services/cart.service';
import { ShippingService } from '../../services/shipping.service';
import { Tracking } from 'src/app/models/shipping';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { environment } from 'src/environments/environment';
import * as countryList from 'country-list';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: PayPalConfig;
  private itemList = [];

  constructor(public CartService: CartService,
              public ShippingService: ShippingService,
              public LoadingScreenService: LoadingScreenService,
              ) {
    //console.log(this.CartService.address);
    //environment.baseURL
  }

  ngOnInit() {
    this.initConfig();
  }

  private initConfig(): void {
    this.generateItemList();
    console.log('Paypal Init');

    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, environment.paypal_environment, {
      commit: true,
      client: {
        sandbox: environment.paypal_id,
        production: environment.paypal_id
      },
      button: {
        label: 'paypal',
        layout: 'vertical',
      },
      

      onPaymentComplete: async (data, actions) => {
        this.LoadingScreenService.on();
        console.log('OnPaymentComplete');
        let transactionId = (await actions.payment.get()).transactions[0].related_resources[0].sale.id;
        console.log(transactionId)
        let obj: Tracking = await this.ShippingService.buyShipment(this.CartService.selected_shipping_rate);
       
        await this.CartService.onPayment(obj, transactionId);
       
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: err => {
        console.log('OnError');
        console.log(err);
      },
      onClick: () => {
        console.log(countryList.getCode(this.CartService.address.country));
        console.log('onClick');
        //console.log(this.CartService.selected_shipping_rate)
        console.log(this.payPalConfig.transactions[0].amount.details.shipping);
        console.log(this.CartService.total)
        this.payPalConfig.transactions[0].amount.details.shipping = this.CartService.shipping;
        this.payPalConfig.transactions[0].amount.total = this.CartService.total;
      },
      validate: (actions) => {
        console.log(actions);
      },
      
      transactions: [{
        amount: {
          currency: 'USD',
          total: +this.CartService.total,
          details: {
            subtotal: +this.CartService.subtotal,
            tax: +this.CartService.tax,
            shipping: +this.CartService.shipping,
            handling_fee: 0,
            shipping_discount: 0,
            insurance: 0
          }
        },
        item_list: {
          items: this.itemList,
          shipping_address: {
            recipient_name: this.CartService.address.name,
            line1: this.CartService.address.street1,
            line2: this.CartService.address.street2,
            city: this.CartService.address.city,
            country_code: countryList.getCode(this.CartService.address.country),
            postal_code: this.CartService.address.zip,
            phone: this.CartService.address.phone,
            state: this.CartService.address.state
          }
        }
      }],
      experience: {
        /** Indicates whether PayPal displays shipping address fields on the experience pages */
        noShipping: true,
        /** A label that overrides the business name in the PayPal account on the PayPal pages. Max length: 127 characters. */
        //brandName: 'Big Kat Original'
        /** URL to the logo image (gif, jpg, or png). The image's maximum width is 190 pixels and maximum height is 60 pixels. */
        //logoImage?: string;
        /** Locale in which to display PayPal page */
        //localeCode?: string;
    },

    });
  }

  

  generateItemList() {
    let productArray = this.CartService.cart.products;
    this.itemList = [];
    for (let i = 0; i < productArray.length; i++) {
      let obj = {
        name: productArray[i].product.name + ' - ' + productArray[i].selectedSize,
        quantity: productArray[i].quantity,
        price: productArray[i].product.price,
        currency: 'USD'
      }
      this.itemList.push(obj)
    }
    return this.itemList;
  }
  
}
/*
export interface IPayPalTransaction {
  amount: IPayPalAmount;
  description?: string;
  custom?: string;
  payment_options?: IPayPalTransactionPaymentOptions;
  soft_descriptor?: string;
  item_list?: IPayPalTransactionItemList;
}

export interface IPayPalTransactionItemList {
  items?: IPayPalTransactionItem[];
  shipping_address?: IPayPalTransactionShippingAddress;
}

export interface IPayPalTransactionItem {
  name: string;
  currency: string;
  price: number;
  quantity: number;

  description?: string;
  tax?: number;
  sku?: string;
}
*/