import { Component, OnInit, Input } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';

import { Collection } from 'src/app/models/admin/collection';
import { Navbar, Col, Cat } from '../../models/navbar';
import { CartService } from '../../services/cart.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  desktop: boolean = true;
  selected: number = -1;
  allGroups: Collection[];
  model: Navbar = new Navbar();
  
  constructor(private CollectionService: CollectionService,
              public CartService: CartService,
              private PageService: PageService) {}

  async ngOnInit() {
    await this.getData(); 


    window.addEventListener("resize", () => {
      this.resize();
    });

    this.resize();


  }

  async getData() {
    this.model.collections = [];
    this.allGroups =  await this.CollectionService.getAll();
    let collections: Collection[] = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Collection' && collection.active);
    });
    let categories: Collection[] = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Category' && collection.active);
    });
    let subcategories: Collection[] = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Subcategory' && collection.active);
    });

    let subs: Collection[] =[];
    let cats: Cat[] = [];
    collections.forEach((collection) => {
      categories.forEach((category) => {
        if (category.shop === collection.name) {
          subcategories.forEach((subcategory) => {
            if (subcategory.shop === collection.name && subcategory.category === category.name)
              subs.push(subcategory)
          });
          cats.push({
            category: category,
            isOpen: false,
            subcategories: subs,
          })
          subs = [];
        }
      });

      this.model.collections.push({
        collection: collection,
        categories: cats,
        isOpen: false,
      })
      cats = [];
      subs = [];
    });

    await this.getPages()
    console.log(this.model)
    return
  }

  async getPages() {
    let pages = await this.PageService.getAll();
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].menu.location === 'Main') {
        switch (pages[i].menu.level) {
          case 'Collection': 
          let col: Col = {
            page: pages[i],
            isOpen: false,
            categories: null,
          } 
          this.model.collections.push(col);
          break;
          case 'Category': 
          let cat: Cat = {
            page: pages[i],
            isOpen: false,
            subcategories: null,
          } 

          for (let i = 0; i < this.model.collections.length; i++) {
            if (this.model.collections[i].collection.name === pages[i].menu.shop) {
              this.model.collections[i].categories.push(cat);
              break;
            }
          }
          break;


          case 'Subcategory':

          for (let i = 0; i < this.model.collections.length; i++) {
            if (this.model.collections[i].collection.name === pages[i].menu.shop) {
             for (let j = 0; j < this.model.collections[i].categories.length; j++) {
              if (this.model.collections[i].categories[j].category.name === pages[i].menu.category) {
                if (this.model.collections[i].categories[j].subcategoryPages)
                  this.model.collections[i].categories[j].subcategoryPages.push(pages[i]);
                else {
                  this.model.collections[i].categories[j].subcategoryPages = [];
                  this.model.collections[i].categories[j].subcategoryPages.push(pages[i]);
                }
              }
              break;
             }
            }
          }
        
          break;
        }
      }
    }

  }

  show(index: number) {
    this.selected = index;
  }



  resize() {
    if (window.innerWidth <= 1024 ) {
      this.desktop = false;
    } else if (window.innerWidth > 1024) {
      this.desktop = true;
    }
  }





  

  

}

