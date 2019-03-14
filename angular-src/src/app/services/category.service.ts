import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryResponse, AllCategoriesResponse } from '../interfaces/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  category: Category;
  categoryArray: Category[];
  url: string = environment.baseURL + 'api/categories/';

  constructor(private http: HttpClient) { }

  async get(stub: string) {
    return new Promise<Category>(async (resolve, reject) => {
      this.http.get(this.url + stub).subscribe((res: CategoryResponse) => {
        resolve(res.data);
      });
    })
  }

  

  async post(cat: Category) {
    return new Promise<Category>(async (resolve, reject) => {
      console.log(cat)
      this.http.post(this.url, cat).subscribe((res: CategoryResponse) => {
        
        this.category = res.data;
        resolve(this.category);
      });
    })
  }

  async update(cat: Category) {
    return new Promise<Category>(async (resolve, reject) => {
      //console.log(cat)
      this.http.post(this.url + 'update', cat).subscribe((res: CategoryResponse) => {
        resolve(res.data);
      });
    })
  }

  async getAll(collectionName: string) {
    return new Promise<Category[]>(async (resolve, reject) => {
      this.http.get(this.url + collectionName).subscribe((res: AllCategoriesResponse) => {
        
        this.categoryArray = res.data;
        resolve(res.data);
      });
    })
  }

  async getActive(collectionName: string) {
    return new Promise<Category[]>(async (resolve, reject) => {
      this.http.get(this.url + collectionName).subscribe((res: AllCategoriesResponse) => {
        if (res.data != null) {
          let ret: Category[] = [];
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

  async getInactive(collectionName: string) {
    return new Promise<Category[]>(async (resolve, reject) => {
      this.http.get(this.url + collectionName).subscribe((res: AllCategoriesResponse) => {
        if (res.data != null) {
          let ret: Category[] = [];
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


  async deactivate(cat: Category) {

    return new Promise<Category>(async (resolve, reject) => {
      //console.log(cat)
      this.http.post(this.url + 'deactivate', cat).subscribe((res: CategoryResponse) => {
        resolve(res.data);
      });
    })


    return new Promise<Category>(async (resolve, reject) => {
      this.http.delete(this.url + cat.shop + '/' + cat.name).subscribe((res: CategoryResponse) => {
       
        this.category = res.data;
        resolve(this.category);
      });
    })
  }

}
