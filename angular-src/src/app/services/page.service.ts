import { Injectable } from '@angular/core';
import { Block } from 'src/app/components/pages/types/block';
import { Subject } from 'rxjs';
import { Page, PageResponse, MultiplePageResponse } from '../components/pages/models/page';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  url: string = environment.baseURL + 'api/pages/';
  blocks: Block[];
  public dirty: Subject<boolean> = new Subject<boolean>();
  public preview: boolean = false;

  constructor(private http: HttpClient) {
    this.blocks = [];
  }

  isDirty() {
    return this.dirty.asObservable();
  }

  addBlock(block: Block) {
    block.data.sortOrder = this.blocks.length;
    this.blocks.push(block);
    this.dirty.next(true);
  }


  async loadPage(stub: string) {
    let page = await this.getByStub(stub);
    console.log(page)
    if (page) {
      return true;
    } else
      return false;
  }


  
  //////////////////////////////////////////////////////////////////////
  //                    HTTP METHODS
  //////////////////////////////////////////////////////////////////////

  async post(page: Page) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.post(this.url, page).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async update(page: Page) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.post(this.url + 'update', page).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async getByStub(stub: String) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.get(this.url + stub).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async getByID(id: String) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.get(this.url + '/id/' + id).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async getAll() {
    return new Promise<Page[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: MultiplePageResponse) => {
        resolve(res.data);
      });
    })
  }

  async delete(page: Page) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.post(this.url + 'delete', page).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

}
