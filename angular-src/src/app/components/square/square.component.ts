import { Component, OnInit, AfterViewInit, NgModule} from '@angular/core';
import { SquareService } from 'src/app/services/square.service';
import { CartService } from 'src/app/services/cart.service';
import { SquareAddress, SquarePayment, SquareTransactionResponse } from 'src/app/models/admin/square';
import * as countryList from 'country-list';
import { Tracking } from 'src/app/models/shipping';
import { ShippingService } from 'src/app/services/shipping.service';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

declare var SqPaymentForm: any;

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit, AfterViewInit {
  locationId = environment.square_locationID;
  applicationId = environment.square_applicationID;
  paymentForm; //this is our payment form object
  nonce: any;

  constructor(private SquareService: SquareService,
              public CartService: CartService,
              private ShippingService: ShippingService,
              private LoadingScreenService: LoadingScreenService,
              private SnackbarService: SnackbarService){}

  

  ngOnInit(){
    this.paymentForm = new SqPaymentForm({

      // Initialize the payment form elements
      applicationId: this.applicationId,
      locationId: this.locationId,
      inputClass: 'sq-input',
      SquareService: this.SquareService,
      //http: new HttpClient();
      
      
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '16px',
        fontFamily: 'Helvetica Neue',
        padding: '16px',
        color: '#373F4A',
        backgroundColor: 'transparent',
        lineHeight: '24px',
        placeholderColor: '#CCC',
        _webkitFontSmoothing: 'antialiased',
        _mozOsxFontSmoothing: 'grayscale'
      }],
    
    
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card Number'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'Exp'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'ZIP'
      },
    
      // SqPaymentForm callback functions
      callbacks: {
    
        /*
         * callback function: methodsSupported
         * Triggered when: the page is loaded.
         */
        methodsSupported: function (methods) {
    
          var applePayBtn = document.getElementById('sq-apple-pay');
          var applePayLabel = document.getElementById('sq-apple-pay-label');
          var masterpassBtn = document.getElementById('sq-masterpass');
          var masterpassLabel = document.getElementById('sq-masterpass-label');
    
          // Only show the button if Apple Pay for Web is enabled
          // Otherwise, display the wallet not enabled message.
          if (methods.applePay === true) {
            applePayBtn.style.display = 'inline-block';
            applePayLabel.style.display = 'none' ;
          }
          // Only show the button if Masterpass is enabled
          // Otherwise, display the wallet not enabled message.
          if (methods.masterpass === true) {
            masterpassBtn.style.display = 'inline-block';
            masterpassLabel.style.display = 'none';
          }
        },
    
        /*
         * callback function: createPaymentRequest
         * Triggered when: a digital wallet payment button is clicked.
         */
        createPaymentRequest: function () {
          // The payment request below is provided as
          // guidance. You should add code to create the object
          // programmatically.
          return {
            requestShippingAddress: true,
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: "Hakuna",
              amount: "{{REPLACE_ME}}",
              pending: false,
            },
            lineItems: [
              {
                label: "Subtotal",
                amount: "{{REPLACE_ME}}",
                pending: false,
              },
              {
                label: "Shipping",
                amount: "{{REPLACE_ME}}",
                pending: true,
              },
              {
                label: "Tax",
                amount: "{{REPLACE_ME}}",
                pending: false,
              }
            ]
          };
        },
    
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            
            console.log("Encountered errors:");
            errors.forEach((error) => {
              this.SnackbarService.onError(error.message, 5000);
              console.log('  ' + error.message);
            });
    
            return;
          }
    
          //alert('Nonce received: ' + nonce); /* FOR TESTING ONLY */
          
          // Assign the nonce value to the hidden form field
          // document.getElementById('card-nonce').value = nonce;
          //needs to be extracted from the
          (<HTMLInputElement>document.getElementById('card-nonce')).value = nonce; //casting so .value will work
          //get this value from the database when the user is logged in
          //(<HTMLInputElement>document.getElementById('sq-id')).value = "CBASEC8F-Phq5_pV7UNi64_kX_4gAQ";
    
          this.onSubmit();
          // POST the nonce form to the payment processing page
          //(<HTMLFormElement>document.getElementById('nonce-form')).ngSubmit();
    
        },
    
        /*
         * callback function: unsupportedBrowserDetected
         * Triggered when: the page loads and an unsupported browser is detected
         */
        unsupportedBrowserDetected: function() {
          /* PROVIDE FEEDBACK TO SITE VISITORS */
        },
    
        /*
         * callback function: inputEventReceived
         * Triggered when: visitors interact with SqPaymentForm iframe elements.
         */
        inputEventReceived: function(inputEvent) {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              /* HANDLE AS DESIRED */
              break;
            case 'focusClassRemoved':
              /* HANDLE AS DESIRED */
              break;
            case 'errorClassAdded':
              /* HANDLE AS DESIRED */
              break;
            case 'errorClassRemoved':
              /* HANDLE AS DESIRED */
              break;
            case 'cardBrandChanged':
              /* HANDLE AS DESIRED */
              break;
            case 'postalCodeChanged':
              /* HANDLE AS DESIRED */
              break;
          }
        },
    
        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
        paymentFormLoaded: function() {
          /* HANDLE AS DESIRED */
        },

       
    }
    });
    console.log(this.paymentForm);
    
     
  }
  requestCardNonce(event) {
    document.getElementById("card-nonce").addEventListener("submit", function(event){
        event.preventDefault(); 
    });

    console.log(event)

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
  
    // Request a nonce from the SqPaymentForm object
    this.paymentForm.requestCardNonce();
  }

  async ngAfterViewInit(){
   
    
  }

  async onSubmit() {
   //casting so .value will work
    this.LoadingScreenService.on();
    
    let nonce = (<HTMLInputElement>document.getElementById('card-nonce')).value; 
    

    let money = {
      amount: (this.CartService.total * 100),
      currency: 'USD'
    }
   

    // START SQUARE ADDRESS
    let first = this.CartService.address.name.indexOf(' ');
    let last = this.CartService.address.name.lastIndexOf(' ') + 1;

    let address: SquareAddress = {
      first_name: this.CartService.address.name.substring(0, first),
     last_name: this.CartService.address.name.substring(last),
     address_line_1: this.CartService.address.street1,
     address_line_2: this.CartService.address.street2,
     locality: this.CartService.address.city,
     administrative_district_level_1: this.CartService.address.state,
     postal_code: this.CartService.address.zip,
     country: countryList.getCode(this.CartService.address.country)
    }
    console.log(address);
    //END

    let payment: SquarePayment = {
      card_nonce: nonce,
      amount_money: money,
      shipping_address: address,
      buyer_email_address: this.CartService.address.email
    }

    let squareTransactionResponse: SquareTransactionResponse = await this.SquareService.processPayment(payment);
    console.log(squareTransactionResponse);
    if (squareTransactionResponse.error) {
      this.LoadingScreenService.off();
      this.SnackbarService.onError(squareTransactionResponse.error, 5000);
    }
      
      
    else {
      let tracking: Tracking = await this.ShippingService.buyShipment(this.CartService.selected_shipping_rate);
      let response = await this.CartService.onPayment_Square(tracking, squareTransactionResponse);  
    }
   
  }

}




