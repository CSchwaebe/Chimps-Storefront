import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../../services/shipping.service';
import { Tracking } from '../../interfaces/shipping';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  model: Tracking;
  orders: Order[] = [];
  order: Order;
  orderID: string;

  constructor(public OrderService: OrderService,
              private LocalStorageService: LocalStorageService) {
    
   }

  async ngOnInit() {
    console.log('App Thanks Init')
    this.orderID = this.LocalStorageService.retrieve('order');
    this.order = await this.OrderService.getById(this.orderID);


    /*
    for (let i = this.orderIDArray.length - 1; i >= 0; i--) {
      console.log(i)
      this.orders.push(await this.OrderService.getById(this.orderIDArray[i]));
    }
    */
  }



}
