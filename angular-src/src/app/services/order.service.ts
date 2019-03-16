import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderResponse, MultipleOrderResponse } from 'src/app/models/admin/order';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = environment.baseURL + 'api/orders/'
  order: Order;

  constructor(private http: HttpClient) { }

  async post(order: Order) {
    return new Promise<Order>(async (resolve, reject) => {
      this.http.post(this.url, order).subscribe((res: OrderResponse) => {
        resolve(res.data);
      });
    })
  }

  async getRecent() {
    return new Promise<Order[]>(async (resolve, reject) => {
      this.http.get(this.url + 'recent').subscribe((res: MultipleOrderResponse) => {
        resolve(res.data);
      });
    })
  }

  async update(order: Order) {
    return new Promise<Order>(async (resolve, reject) => {
      this.http.post(this.url + 'update', order).subscribe((res: OrderResponse) => {
        resolve(res.data);
      });
    })
  }

  async getById(orderID: String) {
    return new Promise<Order>(async (resolve, reject) => {
      this.http.get(this.url + 'id/' + orderID).subscribe((res: OrderResponse) => {
        resolve(res.data);
      });
    })
  }

  
}
