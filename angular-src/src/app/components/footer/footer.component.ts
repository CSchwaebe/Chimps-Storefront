import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/components/pages/models/page';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  storeName: string = 'Big Kat Original';
  pages: Page[];

  constructor(private PageService: PageService) { }

  async ngOnInit() {
    this.pages = [];
    let pages = await this.PageService.getAll();
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].menu.location === 'Footer')
        this.pages.push(pages[i]);
    }
  }

}
