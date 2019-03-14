import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subcategory, SubcategoryResponse, AllSubcategoryResponse } from '../interfaces/subcategory';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  subcategory: Subcategory;
  subcategoryArray: Subcategory[];
  url: string = environment.baseURL + 'api/subcategories/';

  constructor(private http: HttpClient) { }

  async get(stub: string) {
    return new Promise<Subcategory>(async (resolve, reject) => {
      this.http.get(this.url + stub).subscribe((res: SubcategoryResponse) => {
        resolve(res.data);
      });
    })
  }

  async getAll(collection: string, category: string) {
    return new Promise<Subcategory[]>(async (resolve, reject) => {
      this.http.get(this.url + collection + '/' + category).subscribe((res: AllSubcategoryResponse) => {
        resolve(res.data);
      });
    })
  }

  async getActive(collection: string, category: string) {
    return new Promise<Subcategory[]>(async (resolve, reject) => {
      this.http.get(this.url + collection + '/' + category).subscribe((res: AllSubcategoryResponse) => {
        if (res.data != null) {
          let ret: Subcategory[] = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].active)
              ret.push(res.data[i]);
          }
          resolve(ret);
        } else
          resolve(res.data);
      });
    })
  }

  async getInactive(collection: string, category: string) {
    return new Promise<Subcategory[]>(async (resolve, reject) => {
      this.http.get(this.url + collection + '/' + category).subscribe((res: AllSubcategoryResponse) => {
        if (res.data != null) {
          let ret: Subcategory[] = [];
          for (let i = 0; i < res.data.length; i++) {
            if (!res.data[i].active)
              ret.push(res.data[i]);
          }
          resolve(ret);
        } else
          resolve(res.data);
      });
    })
  }



  async post(sub: Subcategory) {
    return new Promise<Subcategory>(async (resolve, reject) => {
      this.http.post(this.url, sub).subscribe((res: SubcategoryResponse) => {
        resolve(res.data);
      });
    })
  }

  async update(sub: Subcategory) {
    return new Promise<Subcategory>(async (resolve, reject) => {
      console.log(sub)
      this.http.post(this.url + 'update', sub).subscribe((res: SubcategoryResponse) => {
        resolve(res.data);
      });
    })
  }

  async deactivate(sub: Subcategory) {
    return new Promise<Subcategory>(async (resolve, reject) => {
      this.http.post(this.url + 'deactivate', sub).subscribe((res: SubcategoryResponse) => {
        resolve(res.data);
      });
    })
  }

}
