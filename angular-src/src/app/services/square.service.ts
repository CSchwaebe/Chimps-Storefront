import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { SquareResponse, SquareAddress, SquarePayment} from 'src/app/models/admin/square'

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  url: string = environment.baseURL + 'api/square/pay';

  constructor(private http: HttpClient) { }

  async processPayment(payment: SquarePayment) {
    return new Promise<any>(async (resolve, reject) => {
      this.http.post(this.url, payment).subscribe((res: SquareResponse) => {
        resolve(res.data);
      });
    })
  }
}
