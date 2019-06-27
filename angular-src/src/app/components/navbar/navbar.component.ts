import { Component, OnInit, Input } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';

import { Collection } from 'src/app/models/admin/collection';
import { Navbar, Col, Cat } from '../../models/navbar';
import { CartService } from '../../services/cart.service';
import { PageService } from 'src/app/services/page.service';
import { Category } from 'src/app/models/admin/category';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() parent: any;
  showMobileMenu: boolean = true;
  selected: number = -1;
  previousCategoryId: string = '';
  previousCollectionId: string = '';

  allGroups: Collection[];

 model: Navbar = new Navbar();

  constructor(private CollectionService: CollectionService,
              public CartService: CartService,
              private PageService: PageService) {}

  async ngOnInit() {
    await this.getData(); 
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

  toggleMobileMenu() {
    //this.previousCategoryId = '';
    //this.previousCollectionId = '';

    //this.showMobileMenu = !this.showMobileMenu;

    //this.parent.sidenav.toggle();
    this.parent.toggleSideNav();    
  }


  closeMobileMenu() {
    this.previousCategoryId = '';
    this.previousCollectionId = '';

    this.showMobileMenu = false;
  }

  expandCollectionsMobile(id) {
  
    //If there is an open category, close it
    if (this.previousCategoryId !== '') {
      this.closeCategoryMobile(this.previousCategoryId);
      this.previousCategoryId = '';
    }
    
    
    //If there is an open collection, close it
    
    if (this.previousCollectionId !== '') 
      this.closeCollectionMobile(this.previousCollectionId)
    

    //If they double clicked the same category, dont open anything
    if (this.previousCollectionId === id) {
      this.previousCollectionId = '';
      return;
    }

    //Open the category they clicked on
    this.openCollectionMobile(id);
   
    //Store the newly activated category so we can use it next time
    this.previousCollectionId = id;
    
  }

  expandCategoriesMobile(id) {
    
    //If there is an open category, close it
    if (this.previousCategoryId !== '') 
      this.closeCategoryMobile(this.previousCategoryId);
    

    //If they double clicked the same category, dont open anything
    if (this.previousCategoryId === id) {
      this.previousCategoryId = '';
      return;
    }
    


    //Open the category they clicked on
    this.openCategoryMobile(id);
    
    //Store the newly activated category so we can use it next time
    this.previousCategoryId = id;
  }

  private closeCollectionMobile(id: string) {
    let elements: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-category-link');
    }
  }

  private openCollectionMobile(id: string) {
    let elements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-category-link');
    }
  }

  private closeCategoryMobile(id: string) {
    let elements: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('display-subcategory-link');
      }
    
  }

  private openCategoryMobile(id: string) {
    let elements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-subcategory-link');
    }
  }



  

  

}
