import { Component, OnInit } from '@angular/core';
import { Tracking } from 'src/app/models/shipping';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/admin/order';
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
