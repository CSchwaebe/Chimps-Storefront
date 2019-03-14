import { Component, OnInit, HostListener } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { CollectionService } from '../../services/collection.service';
import { CategoryService } from '../../services/category.service';

import { Collection } from '../../interfaces/collection';
//import { Category } from '../../interfaces/category';
import { NavbarData } from '../../interfaces/navbarData';
import { Navbar } from '../../models/navbar';
import { CartService } from '../../services/cart.service';
import { SubcategoryService } from '../../services/subcategory.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showMobileMenu: boolean = false;
  selected: number = -1;
  previousCategoryId: string = '';
  previousCollectionId: string = '';

 data: NavbarData = {
   collections: undefined,
 };
  
 model: Navbar = new Navbar();

  constructor(public sessionStorage: SessionStorageService,
              private CollectionService: CollectionService,
              private CategoryService: CategoryService,
              private SubcategoryService: SubcategoryService,
              public CartService: CartService) {}

  async ngOnInit() {
  
   let tmp = this.sessionStorage.retrieve('navbar');
    if (tmp === null) {
      await this.getData();
    } else {
      this.data = tmp;
      this.model = new Navbar(tmp);
    }
    

  }

  async getData() {
   this.data.collections = await this.CollectionService.getActive();
   for (let i = 0; i < this.data.collections.length; i++) {
     this.data.collections[i].categories = await this.CategoryService.getActive(this.data.collections[i].name)
     
     for (let j = 0; j < this.data.collections[i].categories.length; j++) {
      this.data.collections[i].categories[j].subcategories = await this.SubcategoryService.getActive(this.data.collections[i].name, this.data.collections[i].categories[j].name);
    }
   }
   
   this.sessionStorage.store('navbar', this.data);
   this.model = new Navbar(this.data);
  }

  show(index: number) {
    this.selected = index;
  }

  toggleMobileMenu() {
    this.previousCategoryId = '';
    this.previousCollectionId = '';

    this.showMobileMenu = !this.showMobileMenu;
    console.log(this.previousCategoryId + this.previousCollectionId);
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
    console.log(elements);
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
