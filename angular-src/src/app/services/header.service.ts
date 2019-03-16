import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Header, HeaderResponse } from 'src/app/models/header';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  url = environment.baseURL + 'api/headers'
  constructor(private http: HttpClient) { 

  }

  getHeader(stub: string) {
    return new Promise<Header>(async (resolve, reject) => {
      console.log(stub);
      this.http.get(this.url + stub).subscribe((res: HeaderResponse) => {
        resolve(res.data);
      });
    })
  }
}
