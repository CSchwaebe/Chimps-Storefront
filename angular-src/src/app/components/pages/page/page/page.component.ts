import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Block } from '../../types/block';
import { BlockDirective } from '../../directives/block.directive';
import { BlockService } from 'src/app/services/block.service';
import { Page } from '../../models/page';
//import { Draggable, Swappable, Sortable, sortableEvent, draggableEvent, draggableInitializedEvent } from '@shopify/draggable';
import { PageService } from 'src/app/services/page.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Collection } from 'src/app/models/admin/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent implements OnInit, AfterViewInit {
  /*@Input()*/
  model: Page = {
    title: undefined,
    stub: undefined,
    blocks: [],
    menu: {
      location: undefined,
      level: undefined,
    }
  }

  blocks: Block[];
  viewContainerRef: ViewContainerRef;
  toolbar: boolean = false;
  location: boolean = false;
  //For location
  allGroups: Collection[];
  collections: Collection[];
  categories: Collection[];
  subcategories: Collection[];

  //For Adding a new Block
  options: string[] = [
    'Text',
    'Image',
    'Video'
  ]
  type: string = '';
  style = {
    width: '',
  }
  videoURL: string = '';

  subscription: Subscription;


  @ViewChild(BlockDirective) blockDirective: BlockDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private BlockService: BlockService,
    public PageService: PageService,
    private SnackbarService: SnackbarService,
    private Router: Router,
    private CollectionService: CollectionService
  ) {
    this.subscription = this.PageService.isDirty().subscribe(status => {
      this.model.blocks = this.PageService.blocks;
      this.loadComponents();
    });
  }

  async ngOnInit() {
    this.PageService.blocks = [];
    this.getCollections();
    this.viewContainerRef = this.blockDirective.viewContainerRef;

    let exists = await this.checkForPage();

    if (exists)
      this.loadComponents();
    else {
    }
  }

  async checkForPage() {
    let index = this.Router.url.lastIndexOf('/');
    let stub = this.Router.url.substring(index + 1);

    let page = await this.PageService.getByStub(stub);
    console.log(page)
    
    if (page) {
      this.model = page;
      const blocks = this.model.blocks;

      for (let i = 0; i < blocks.length; i++) {
        await this.PageService.addBlock(this.BlockService.attachComponentToData(blocks[i].data.type, blocks[i].data))
        console.log("added block " + i)
      }
      return true;
    } else
      return false;

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  loadComponents() {
    console.log(this.model.blocks);
    this.viewContainerRef.clear();
    for (let i = 0; i < this.model.blocks.length; i++) {

      //Basicall this.blocks contains objects that have a componenet and data needed to initialize that componenet
      let block = this.model.blocks[i];

      //This grabs the component
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(block.component);

      //creates the component
      let componentRef = this.viewContainerRef.createComponent(componentFactory);
      //Adds the data to the componenet
      (<Block>componentRef.instance).data = block.data;
    }

  }





  ////////////////////////////////////////////////////////////////////////////
  //                          LOCATION
  ////////////////////////////////////////////////////////////////////////////

  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection';
      })
      console.log(this.allGroups);
      resolve(this.collections);
    })
  }

  getCategories() {
    console.log('GEt categories')
    let collection: string = this.model.menu.shop;
    console.log(collection);
    this.categories = this.allGroups.filter((category, index, collectionArray) => {
      return (category.type === 'Category' && category.shop === collection);
    })

    console.log(this.categories)

  }


  getSubcategories() {
    let collection: string = this.model.menu.shop;
    let category: string = this.model.menu.category;

    this.subcategories = this.allGroups.filter((subcategory, index, collectionArray) => {
      return (subcategory.type === 'Subcategory' && subcategory.category === category && subcategory.shop === collection);
    })

  }

  clearCat() {
    this.model.menu.category = undefined;
  }

  clearCol() {
    this.model.menu.shop = undefined;
    this.model.menu.category = undefined;
  }




}
