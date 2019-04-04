import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartProduct } from '../../models/cartProduct'; 
import { CartService } from '../../services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  title: string;
  sizes: string[] = [];
  inventory: Record<string, number> = {};
  model: CartProduct = new CartProduct();
  
  availableQty = [1];
  images: string[] = [];
  selectedImage: string = '';
  constructor(private router: Router,
    private ProductService: ProductService,
    public CartService: CartService,
    private SnackbarService: SnackbarService,
    public TitleService: TitleService,
    private Router: Router) {

    this.model.selectedSize = undefined;
    this.model.quantity = 1;
    this.getProduct();

  }

  async ngOnInit() {
    window.scrollTo(0,0);
  }

  async getProduct() {
    //this.model.product = await this.ProductService.get(this.router.url.substr(this.router.url.lastIndexOf('/') + 1));
    this.model.product = await this.ProductService.getById(this.router.url.substr(this.router.url.lastIndexOf('-') + 1));

    //If the product isn't active then the page shouldnt exist
    if (!this.model.product.active) {
      this.Router.navigate(['/']);
      return;
    }
    for (let i = 0; i < this.model.product.inventory.length; i++) {
      if (this.model.product.inventory[i].quantity > 0) {
        this.sizes.push(this.model.product.inventory[i].size);
        this.inventory[this.model.product.inventory[i].size] = this.model.product.inventory[i].quantity;
      }
    }
   
    this.images = this.model.product.images;
    this.selectedImage = this.images[0];
    this.TitleService.setTitle(this.model.product.name);
  }

  getAvailableQty(size: string) {
    let tmp = this.inventory[size];
    this.availableQty = [];
    for (let i = 1; i <= tmp && i <= 10; i++) {
      this.availableQty.push(i);
    }
  }

  onSubmit() {
    if (this.model.selectedSize === undefined)
      alert('Please Select a Size');
    else {
      let tmp = new CartProduct(this.model.product, this.model.selectedSize, this.model.quantity);

      this.CartService.addItem(tmp);
      this.SnackbarService.addToCart();
    }
  }

  changeImage(index: number) {
    this.selectedImage = this.images[index];
  }

}
