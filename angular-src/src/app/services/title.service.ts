import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  storeName: string = 'Big Kat Original';

  constructor(private Title: Title,
    private AccountService: AccountService) {
     
    }

  setTitle(title: string) {
    this.Title.setTitle(title + ' | ' + this.storeName);
  }
}
