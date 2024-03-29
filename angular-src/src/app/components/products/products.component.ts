import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/admin/product';
import { HeaderService } from '../../services/header.service';
import { Subscription } from 'rxjs';
import { TitleService } from 'src/app/services/title.service';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {


  productArray: Product[] = [];
  soldOutProductArray: Product[] = [];
  title: string;
  header: string;
  subscription: Subscription;


  constructor(private router: Router,
    private ProductService: ProductService,
    private HeaderService: HeaderService,
    public TitleService: TitleService,
    public StyleService: StyleService) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
          this.load();
    })
  }

  ngOnInit() {
    window.scrollTo(0,0);
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async load() {
    let headerResponse = await this.HeaderService.getHeader(this.router.url)
    this.header = headerResponse.image;
    this.title = headerResponse.name;
    this.TitleService.setTitle(this.title);
    this.getProducts();
  }



  async getProducts() {
    this.soldOutProductArray = [];
    this.productArray = [];
    
    let tmpProductArray = await this.ProductService.getActive(this.router.url);

    let active = [];
    for (let i = 0; i < tmpProductArray.length; i++) {
   
      //Checking to see if its sold out
      // If every vairant has a quantity of 0, then its sold out
      // If any variant has a quantity greater than 0, not sold out
      let soldOut = true;
      for (let j = 0; j < tmpProductArray[i].inventory.length; j++) {
        if (tmpProductArray[i].inventory[j].quantity > 0) {
          soldOut = false;
          break;
        }
      }

      if (soldOut) {
        this.soldOutProductArray.push(tmpProductArray[i]);
        continue;
      }
      // END SOLD OUT LOGIC 

      //NOW We are left with only active, in stock products
      active.push(tmpProductArray[i])
    }
    
    this.productArray = active;
  }
}
