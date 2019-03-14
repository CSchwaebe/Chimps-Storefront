import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  storeName: string = 'Big Kat Original';

  constructor(private Title: Title) { }

  setTitle(title: string) {
    this.Title.setTitle(title + ' | ' + this.storeName);
  }
}
